import { Pool } from 'pg';

// Database configuration
const DATABASE_URL = process.env.DATABASE_URL;

// Create PostgreSQL connection pool
export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Database schema types
export interface QuizResponse {
  id?: string;
  sessionId: string;
  language: string;
  framework: string;
  ide: string;
  vibe: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizResponseRow {
  id: string;
  session_id: string;
  language: string;
  framework: string;
  ide: string;
  vibe: string;
  created_at: string;
  updated_at: string;
}

// Initialize database schema
export async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quiz_responses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id VARCHAR(255) UNIQUE NOT NULL,
        language VARCHAR(100) NOT NULL,
        framework VARCHAR(100) NOT NULL,
        ide VARCHAR(100) NOT NULL,
        vibe VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index for faster lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quiz_responses_session_id 
      ON quiz_responses(session_id)
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Transform database row to QuizResponse type
function transformRowToQuizResponse(row: QuizResponseRow): QuizResponse {
  return {
    id: row.id,
    sessionId: row.session_id,
    language: row.language,
    framework: row.framework,
    ide: row.ide,
    vibe: row.vibe,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

// Database operations
export const quizResponsesDb = {
  // Save or update a quiz response (upsert)
  async saveQuizResponse(
    data: Omit<QuizResponse, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<QuizResponse> {
    try {
      console.log('Saving quiz response for session:', data.sessionId);

      const result = await pool.query(
        `INSERT INTO quiz_responses (session_id, language, framework, ide, vibe)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (session_id) 
         DO UPDATE SET 
           language = EXCLUDED.language,
           framework = EXCLUDED.framework,
           ide = EXCLUDED.ide,
           vibe = EXCLUDED.vibe,
           updated_at = CURRENT_TIMESTAMP
         RETURNING *`,
        [data.sessionId, data.language, data.framework, data.ide, data.vibe]
      );

      if (result.rows.length > 0) {
        const savedResponse = transformRowToQuizResponse(result.rows[0] as QuizResponseRow);
        console.log('Quiz response saved:', savedResponse);
        return savedResponse;
      }

      throw new Error('Failed to save quiz response');
    } catch (error) {
      console.error('Error saving quiz response:', error);
      throw error;
    }
  },

  // Get a quiz response by session ID
  async getQuizResponseBySessionId(sessionId: string): Promise<QuizResponse | null> {
    try {
      const result = await pool.query('SELECT * FROM quiz_responses WHERE session_id = $1', [
        sessionId,
      ]);

      if (result.rows.length > 0) {
        return transformRowToQuizResponse(result.rows[0] as QuizResponseRow);
      }

      return null;
    } catch (error) {
      console.error('Error getting quiz response:', error);
      throw error;
    }
  },

  // Get all quiz responses
  async getAllQuizResponses(): Promise<QuizResponse[]> {
    try {
      const result = await pool.query('SELECT * FROM quiz_responses ORDER BY created_at DESC');

      return result.rows.map((row: QuizResponseRow) => transformRowToQuizResponse(row));
    } catch (error) {
      console.error('Error getting all quiz responses:', error);
      throw error;
    }
  },

  // Delete a quiz response by session ID
  async deleteQuizResponse(sessionId: string): Promise<boolean> {
    try {
      const result = await pool.query('DELETE FROM quiz_responses WHERE session_id = $1', [
        sessionId,
      ]);

      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      console.error('Error deleting quiz response:', error);
      throw error;
    }
  },

  // Get response statistics
  async getResponseStats(): Promise<{
    totalResponses: number;
    languageStats: Record<string, number>;
    frameworkStats: Record<string, number>;
    ideStats: Record<string, number>;
    vibeStats: Record<string, number>;
  }> {
    try {
      const [totalResult, languageResult, frameworkResult, ideResult, vibeResult] =
        await Promise.all([
          pool.query('SELECT COUNT(*) as total FROM quiz_responses'),
          pool.query(
            'SELECT language, COUNT(*) as count FROM quiz_responses GROUP BY language ORDER BY count DESC'
          ),
          pool.query(
            'SELECT framework, COUNT(*) as count FROM quiz_responses GROUP BY framework ORDER BY count DESC'
          ),
          pool.query(
            'SELECT ide, COUNT(*) as count FROM quiz_responses GROUP BY ide ORDER BY count DESC'
          ),
          pool.query(
            'SELECT vibe, COUNT(*) as count FROM quiz_responses GROUP BY vibe ORDER BY count DESC'
          ),
        ]);

      const totalResponses = parseInt(totalResult.rows[0].total);

      const languageStats = languageResult.rows.reduce(
        (acc, row) => {
          acc[row.language] = parseInt(row.count);
          return acc;
        },
        {} as Record<string, number>
      );

      const frameworkStats = frameworkResult.rows.reduce(
        (acc, row) => {
          acc[row.framework] = parseInt(row.count);
          return acc;
        },
        {} as Record<string, number>
      );

      const ideStats = ideResult.rows.reduce(
        (acc, row) => {
          acc[row.ide] = parseInt(row.count);
          return acc;
        },
        {} as Record<string, number>
      );

      const vibeStats = vibeResult.rows.reduce(
        (acc, row) => {
          acc[row.vibe] = parseInt(row.count);
          return acc;
        },
        {} as Record<string, number>
      );

      return {
        totalResponses,
        languageStats,
        frameworkStats,
        ideStats,
        vibeStats,
      };
    } catch (error) {
      console.error('Error getting response stats:', error);
      throw error;
    }
  },
};

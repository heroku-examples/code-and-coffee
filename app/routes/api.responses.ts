import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { z } from 'zod';
import { quizResponsesDb } from '~/lib/db';

// Validation schema for quiz responses
const QuizResponseSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  language: z.enum(['Node.js', 'Python', 'Java', 'Go', 'Ruby', '.NET', 'PHP']),
  framework: z.string().min(1, 'Framework is required'),
  ide: z.string().min(1, 'IDE is required'),
  vibe: z.string().min(1, 'Vibe is required'),
});

/**
 * GET /api/responses - Get quiz responses
 * Query parameters:
 * - sessionId: Get specific session's response
 * - stats: Get response statistics
 */
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('sessionId');
    const stats = url.searchParams.get('stats');

    if (stats === 'true') {
      // Return response statistics
      const statistics = await quizResponsesDb.getResponseStats();
      return Response.json(statistics);
    }

    if (sessionId) {
      // Return specific session's response
      const response = await quizResponsesDb.getQuizResponseBySessionId(sessionId);
      if (!response) {
        return Response.json({ error: 'Quiz response not found' }, { status: 404 });
      }
      return Response.json(response);
    }

    // Return all responses
    const responses = await quizResponsesDb.getAllQuizResponses();
    return Response.json(responses);
  } catch (error) {
    console.error('Error in GET /api/responses:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/responses - Save/update quiz response
 * Body: { sessionId, language, framework, ide, vibe }
 */
export async function action({ request }: ActionFunctionArgs) {
  try {
    if (request.method === 'POST') {
      const body = await request.json();

      // Validate input
      const validationResult = QuizResponseSchema.safeParse(body);
      if (!validationResult.success) {
        return Response.json(
          { error: 'Validation failed', details: validationResult.error.errors },
          { status: 400 }
        );
      }

      const { sessionId, language, framework, ide, vibe } = validationResult.data;

      // Save the response
      const savedResponse = await quizResponsesDb.saveQuizResponse({
        sessionId,
        language,
        framework,
        ide,
        vibe,
      });

      return Response.json(savedResponse, { status: 201 });
    }

    if (request.method === 'DELETE') {
      const url = new URL(request.url);
      const sessionId = url.searchParams.get('sessionId');

      if (!sessionId) {
        return Response.json({ error: 'Session ID is required' }, { status: 400 });
      }

      const deleted = await quizResponsesDb.deleteQuizResponse(sessionId);
      if (!deleted) {
        return Response.json({ error: 'Quiz response not found' }, { status: 404 });
      }

      return Response.json({ message: 'Quiz response deleted successfully' });
    }

    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  } catch (error) {
    console.error('Error in POST/DELETE /api/responses:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

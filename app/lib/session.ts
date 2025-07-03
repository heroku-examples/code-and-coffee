// Session management utilities

/**
 * Generate a unique session ID
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Get or create a session ID from sessionStorage
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    // Server-side: generate a new session ID
    return generateSessionId();
  }

  let sessionId = sessionStorage.getItem('quizSessionId');

  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('quizSessionId', sessionId);
  }

  return sessionId;
}

/**
 * Clear the current session
 */
export function clearSession(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('quizSessionId');
    sessionStorage.removeItem('selectedLanguage');
    sessionStorage.removeItem('selectedFramework');
    sessionStorage.removeItem('selectedIDE');
    sessionStorage.removeItem('selectedVibe');
    sessionStorage.removeItem('recommendation');
  }
}

/**
 * Save a quiz step to the database
 */
export async function saveQuizStep(step: string, value: string): Promise<void> {
  const sessionId = getOrCreateSessionId();

  // Get current selections from sessionStorage
  const currentSelections = {
    language: sessionStorage.getItem('selectedLanguage') || '',
    framework: sessionStorage.getItem('selectedFramework') || '',
    ide: sessionStorage.getItem('selectedIDE') || '',
    vibe: sessionStorage.getItem('selectedVibe') || '',
  };

  // Update the current step
  currentSelections[step as keyof typeof currentSelections] = value;

  // Only save to database if we have all required fields
  if (
    currentSelections.language &&
    currentSelections.framework &&
    currentSelections.ide &&
    currentSelections.vibe
  ) {
    try {
      const response = await fetch('/api/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          language: currentSelections.language,
          framework: currentSelections.framework,
          ide: currentSelections.ide,
          vibe: currentSelections.vibe,
        }),
      });

      if (!response.ok) {
        console.error('Failed to save quiz response:', await response.text());
      }
    } catch (error) {
      console.error('Error saving quiz response:', error);
      // Don't throw error - we still want the quiz to continue
    }
  }
}

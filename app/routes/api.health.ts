/**
 * GET /api/health
 * Simple health check endpoint to verify the server is running
 */
export async function loader() {
  return new Response(
    JSON.stringify({
      status: 'ok',
      message: 'Code & Coffee API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

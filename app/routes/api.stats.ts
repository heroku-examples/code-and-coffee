import { quizResponsesDb } from '~/lib/db';

export async function loader() {
  try {
    const stats = await quizResponsesDb.getResponseStats();
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch statistics' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

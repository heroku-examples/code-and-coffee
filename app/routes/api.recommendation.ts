import type { ActionFunctionArgs } from 'react-router';
import { z } from 'zod';
import type { RecommendationResponse } from '../types/api';
import { mastra } from '../../src/mastra';

// Validation schema for the request - matching the workflow's expected enum
const RecommendationRequestSchema = z.object({
  language: z.enum(['Node.js', 'Python', 'Java', 'Go', 'Ruby', '.NET', 'PHP']),
  framework: z.string().min(1, 'Framework is required'),
  ide: z.string().min(1, 'IDE is required'),
  vibe: z.string().min(1, 'Vibe is required'),
});

/**
 * API route for generating coffee recommendations
 * POST /api/recommendation
 */
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse and validate the request body
    const body = await request.json();
    const validatedData = RecommendationRequestSchema.parse(body);

    console.log('Generating coffee recommendation for:', validatedData);

    // Use the proper Mastra approach: get the workflow from the mastra instance
    const workflow = mastra.getWorkflow('coffeeRecommendationWorkflow');

    if (!workflow) {
      throw new Error('Coffee recommendation workflow not found');
    }

    // Execute the workflow using the proper Mastra pattern
    const run = await workflow.createRunAsync();

    const result = await run.start({
      inputData: validatedData,
    });

    if (result.status !== 'success' || !result.result) {
      throw new Error('Workflow execution failed');
    }

    const recommendation = result.result as RecommendationResponse;

    console.log('Generated recommendation:', recommendation);

    return new Response(JSON.stringify(recommendation), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in recommendation API:', error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: 'Invalid request data',
          details: error.errors,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Fallback recommendation for any other errors
    const fallbackRecommendation: RecommendationResponse = {
      coffeeName: 'Debug Blend',
      flavorProfile:
        'A robust, full-bodied coffee with notes of dark chocolate and a hint of vanilla. Smooth finish with just enough caffeine to power through those late-night coding sessions.',
      reasoning:
        "When the code breaks, you need a coffee that won't. This reliable blend is like a well-tested function - it always delivers consistent results and keeps you running smoothly.",
    };

    return new Response(JSON.stringify(fallbackRecommendation), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

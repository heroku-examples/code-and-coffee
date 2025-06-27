import 'dotenv/config';
import { z } from 'zod';
import {
  validateRecommendationRequest,
  type RecommendationRequest,
  type RecommendationResponse,
} from '~/types';
import { executeCoffeeRecommendation } from '../../src/mastra/workflows/coffee-recommendation-workflow';

// Zod schema for additional validation
const RecommendationRequestSchema = z.object({
  language: z.enum(['Node.js', 'Python', 'Java', 'Go', 'Ruby', '.NET', 'PHP']),
  framework: z.string().min(1),
  ide: z.string().min(1),
  vibe: z.string().min(1),
});

/**
 * POST /api/recommendation
 * Generates a coffee recommendation based on user preferences using Mastra AI
 */
export async function action({ request }: { request: Request }) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed', status: 405 }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let validatedData: RecommendationRequest | null = null;

  try {
    // Parse the request body
    const body = await request.json();

    // Validate using our custom validation function
    if (!validateRecommendationRequest(body)) {
      return new Response(
        JSON.stringify({
          error: 'Invalid request format',
          status: 400,
          details: 'Request must include valid language, framework, ide, and vibe fields',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Additional validation with Zod for extra safety
    validatedData = RecommendationRequestSchema.parse(body);

    // Use Mastra AI workflow to generate the recommendation
    console.log('Generating coffee recommendation with Mastra for:', validatedData);
    const recommendation = await executeCoffeeRecommendation(validatedData);

    return new Response(JSON.stringify(recommendation), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed',
          status: 400,
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // If Mastra workflow fails, provide a fallback response
    const fallbackRecommendation = generateFallbackRecommendation(
      validatedData || {
        language: 'Node.js',
        framework: 'Express.js',
        ide: 'VS Code',
        vibe: 'elegantly-simple',
      }
    );

    console.warn('Mastra workflow failed, using fallback recommendation');
    return new Response(JSON.stringify(fallbackRecommendation), {
      status: 200, // Still return 200 since we have a fallback
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * Fallback recommendation generator when Mastra workflow fails
 * Provides a reliable backup response
 */
function generateFallbackRecommendation(request: RecommendationRequest): RecommendationResponse {
  const fallbackRecommendations: Record<string, RecommendationResponse> = {
    'Node.js': {
      coffeeName: 'Async Espresso',
      flavorProfile: 'Bold and efficient with notes of vanilla and a smooth, non-blocking finish',
      reasoning: `Like Node.js, this espresso is single-threaded but powerful - it gets things done fast and efficiently. Your choice of ${request.framework} framework and ${request.ide} IDE suggests you appreciate streamlined tools, and the ${request.vibe} vibe calls for a coffee that delivers maximum impact with minimal complexity.`,
    },
    Python: {
      coffeeName: 'Pythonic Colombian',
      flavorProfile: 'Smooth, well-balanced, and universally beloved with hints of chocolate',
      reasoning: `Just like Python, this Colombian coffee is elegant, readable, and gets the job done beautifully. With ${request.framework} framework and ${request.ide} in your toolkit, plus a ${request.vibe} approach, you need a coffee that's as versatile and reliable as your favorite language.`,
    },
    Java: {
      coffeeName: 'Enterprise Dark Roast',
      flavorProfile: 'Robust, full-bodied, and built to last with strong, consistent notes',
      reasoning: `Like Java itself, this dark roast is enterprise-grade - robust, reliable, and ready for any challenge. Your ${request.framework} framework, ${request.ide} setup, and ${request.vibe} philosophy align perfectly with a coffee that's been proven in production environments worldwide.`,
    },
    Go: {
      coffeeName: 'Concurrent Cold Brew',
      flavorProfile: 'Clean, efficient, and refreshingly fast with no unnecessary complexity',
      reasoning: `Go's simplicity and speed deserve a coffee that matches - this cold brew is efficient, clean, and gets straight to the point. With ${request.framework} framework, ${request.ide}, and your ${request.vibe} mindset, you need fuel that performs without the overhead.`,
    },
    Ruby: {
      coffeeName: 'Artisan Pour-Over',
      flavorProfile:
        'Elegant and expressive with carefully crafted flavor notes that make you happy',
      reasoning: `Ruby developers appreciate beauty in simplicity, and this pour-over delivers exactly that. Your ${request.framework} framework, ${request.ide} choice, and ${request.vibe} approach show you value craftsmanship - this coffee celebrates the same principles of elegant, expressive design.`,
    },
    '.NET': {
      coffeeName: 'Structured Macchiato',
      flavorProfile:
        'Layered, well-organized, and enterprise-ready with a perfect balance of components',
      reasoning: `Like the .NET ecosystem, this macchiato has structure, layers, and enterprise-grade reliability. Your ${request.framework} framework, ${request.ide} toolkit, and ${request.vibe} philosophy call for a coffee that's as well-architected and dependable as your favorite framework.`,
    },
    PHP: {
      coffeeName: 'Classic Americano',
      flavorProfile: 'Straightforward, reliable, and gets the job done without fanfare',
      reasoning: `PHP powers the web quietly and effectively, just like this Americano powers developers. With ${request.framework} framework, ${request.ide}, and your ${request.vibe} approach, you need a coffee that's practical, dependable, and ready for anything the internet throws at it.`,
    },
  };

  return (
    fallbackRecommendations[request.language] || {
      coffeeName: "Developer's Choice Blend",
      flavorProfile: 'A perfect balance of energy and focus with notes of determination',
      reasoning: `Every great developer needs great coffee. Your combination of ${request.language}, ${request.framework}, ${request.ide}, and ${request.vibe} energy deserves a custom blend designed for peak performance.`,
    }
  );
}

import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

/**
 * Simplified Coffee Knowledge Tool
 *
 * This tool provides focused coffee knowledge for developer recommendations.
 * Simplified from the original 442-line implementation to be more maintainable and reusable.
 */
export const coffeeKnowledgeTool = createTool({
  id: 'coffee-knowledge',
  description:
    'Provides coffee knowledge and suggestions based on developer preferences and context',
  inputSchema: z.object({
    query: z
      .string()
      .describe('Keywords for coffee knowledge lookup (e.g., "flavor profile roast brewing")'),
    context: z.string().optional().describe('Additional context about the developer profile'),
  }),
  outputSchema: z.object({
    knowledge: z.string().describe('Relevant coffee knowledge and recommendations'),
    suggestions: z.array(z.string()).describe('Specific coffee suggestions'),
  }),
  execute: async ({ context }) => {
    const { query, context: devContext } = context;

    // Simplified coffee knowledge focused on developer personality traits
    const developerCoffeeMap = {
      'creative innovative complex': {
        knowledge:
          'Creative developers often enjoy complex, innovative coffee experiences. Ethiopian single origins with bright, fruity flavors and wine-like acidity match their creative problem-solving approach.',
        suggestions: ['Ethiopian Yirgacheffe', 'Kenyan AA', 'Natural Process Single Origin'],
      },
      'reliable practical efficient': {
        knowledge:
          'Practical developers prefer reliable, consistent coffee that gets the job done. Brazilian and Colombian beans offer balanced, no-nonsense flavors with reliable quality.',
        suggestions: ['Brazilian Santos', 'Colombian Supremo', 'Medium Roast Blend'],
      },
      'performance speed system': {
        knowledge:
          'Performance-focused developers need efficient caffeine delivery. Cold brew and espresso provide quick, concentrated energy without complexity.',
        suggestions: ['Cold Brew Concentrate', 'Double Espresso', 'Nitro Cold Brew'],
      },
      'enterprise traditional robust': {
        knowledge:
          'Enterprise developers value stability and proven solutions. Dark roast blends offer bold, reliable flavors that have stood the test of time.',
        suggestions: ['French Roast', 'Italian Dark Blend', 'Espresso Roast'],
      },
      'elegant simple clean': {
        knowledge:
          'Developers who value elegance prefer clean, well-crafted coffee. Pour-over brewing methods highlight the pure essence of high-quality beans.',
        suggestions: ['Japanese Pour-Over', 'Light Roast Single Origin', 'Chemex Coffee'],
      },
      'experimental cutting-edge modern': {
        knowledge:
          'Modern, experimental developers enjoy innovative brewing methods and unique flavor profiles. Specialty processing and alternative brewing unlock new experiences.',
        suggestions: ['Honey Process Coffee', 'AeroPress', 'Specialty Fermented Beans'],
      },
    };

    // Basic language-specific recommendations
    const languageTraits = {
      'Node.js': 'creative innovative async',
      Python: 'elegant simple readable',
      Java: 'enterprise traditional robust',
      Go: 'performance speed efficient',
      Ruby: 'elegant creative expressive',
      '.NET': 'enterprise reliable structured',
      PHP: 'practical reliable web-focused',
    };

    let knowledge = '';
    let suggestions: string[] = [];

    // Extract language from context if available
    const contextLower = (devContext || '').toLowerCase();
    const queryLower = query.toLowerCase();

    // Find matching traits based on language or context
    let matchingTraits = '';
    for (const [lang, traits] of Object.entries(languageTraits)) {
      if (contextLower.includes(lang.toLowerCase())) {
        matchingTraits = traits;
        break;
      }
    }

    // If no language match, use query keywords
    if (!matchingTraits) {
      if (queryLower.includes('creative') || queryLower.includes('innovative')) {
        matchingTraits = 'creative innovative complex';
      } else if (queryLower.includes('performance') || queryLower.includes('speed')) {
        matchingTraits = 'performance speed system';
      } else if (queryLower.includes('elegant') || queryLower.includes('simple')) {
        matchingTraits = 'elegant simple clean';
      } else if (queryLower.includes('enterprise') || queryLower.includes('traditional')) {
        matchingTraits = 'enterprise traditional robust';
      } else {
        matchingTraits = 'reliable practical efficient';
      }
    }

    // Find best matching coffee knowledge
    for (const [traits, coffeeInfo] of Object.entries(developerCoffeeMap)) {
      const traitWords = traits.split(' ');
      const matchingWords = traitWords.filter(
        word => matchingTraits.includes(word) || contextLower.includes(word)
      );

      if (matchingWords.length > 0) {
        knowledge = coffeeInfo.knowledge;
        suggestions = coffeeInfo.suggestions;
        break;
      }
    }

    // Fallback if no specific match
    if (!knowledge) {
      knowledge =
        'A well-balanced coffee that complements focused development work. Consider medium roast origins that provide consistent energy and pleasant flavors without being overpowering.';
      suggestions = ['Colombian Medium Roast', 'Brazilian Blend', 'Balanced Espresso'];
    }

    return {
      knowledge,
      suggestions,
    };
  },
});

/**
 * Developer Profile Analysis Tool
 *
 * Simplified tool for analyzing developer preferences
 */
export const developerProfileTool = createTool({
  id: 'developer-profile',
  description: 'Analyzes developer preferences and tech stack choices',
  inputSchema: z.object({
    language: z.string(),
    framework: z.string(),
    ide: z.string(),
    vibe: z.string(),
  }),
  outputSchema: z.object({
    profile: z.string(),
    traits: z.array(z.string()),
  }),
  execute: async ({ context }) => {
    const { language, framework, ide, vibe } = context;

    const profile = `Developer using ${language} with ${framework}, codes in ${ide}, and follows a ${vibe} approach.`;

    // Basic trait analysis
    const traits = [];
    if (language === 'Go' || language === 'Rust') traits.push('performance-focused');
    if (language === 'Python' || language === 'Ruby') traits.push('elegant');
    if (language === 'Java' || language === '.NET') traits.push('enterprise');
    if (vibe.includes('creative') || vibe.includes('artistic')) traits.push('creative');
    if (vibe.includes('simple') || vibe.includes('minimal')) traits.push('minimalist');

    return {
      profile,
      traits: traits.length > 0 ? traits : ['balanced'],
    };
  },
});

import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { coffeeSommelierAgent } from '../agents/coffee-sommelier-agent';
import { coffeeKnowledgeTool } from '../tools/coffee-recommendation-tool';

/**
 * Improved Coffee Recommendation Workflow
 *
 * This workflow now properly uses agents and tools as steps according to Mastra best practices:
 * 1. Uses proper intermediate steps for data transformation
 * 2. Uses tools as steps and agents via .generate() method
 * 3. Simplified data flow with proper schema mapping
 * 4. Better logging and observability through Mastra's built-in systems
 */

// Step 1: Transform input data for the knowledge tool
const prepareKnowledgeQueryStep = createStep({
  id: 'prepare-knowledge-query',
  description: 'Prepare query parameters for coffee knowledge lookup',
  inputSchema: z.object({
    language: z.enum(['Node.js', 'Python', 'Java', 'Go', 'Ruby', '.NET', 'PHP']),
    framework: z.string(),
    ide: z.string(),
    vibe: z.string(),
  }),
  outputSchema: z.object({
    query: z.string(),
    context: z.string().optional(),
  }),
  execute: async ({ inputData }) => {
    const { language, framework, ide, vibe } = inputData;
    return {
      query: 'flavor profile brewing method roast level origin',
      context: `${language} ${framework} ${ide} ${vibe} developer preferences`,
    };
  },
});

// Step 2: Use the coffee knowledge tool directly as a step
const gatherKnowledgeStep = createStep(coffeeKnowledgeTool);

// Step 3: Generate coffee recommendation using the agent
const generateRecommendationStep = createStep({
  id: 'generate-recommendation',
  description: 'Generate coffee recommendation using the sommelier agent',
  inputSchema: z.object({
    knowledge: z.string(),
    suggestions: z.array(z.string()),
  }),
  outputSchema: z.object({
    coffeeName: z.string(),
    flavorProfile: z.string(),
    reasoning: z.string(),
  }),
  execute: async ({ inputData, getInitData }) => {
    const initData = getInitData();
    const { knowledge, suggestions } = inputData;

    // Create a comprehensive prompt for the agent
    const prompt = `
      Analyze this developer's profile and recommend the perfect coffee:
      
      **Developer Profile:**
      - Programming Language: ${initData.language}
      - Framework: ${initData.framework}
      - IDE: ${initData.ide}
      - Coding Philosophy: ${initData.vibe}
      
      **Coffee Knowledge Context:**
      ${knowledge}
      
      **Suggested Coffee Types:**
      ${suggestions.join(', ')}
      
      Consider how these choices reflect their personality, work style, and preferences. 
      Match them with a coffee that complements their coding journey.
      
      Remember to be witty and make clever connections between their tech choices and coffee characteristics!
    `;

    try {
      // Generate a unique thread ID for this recommendation request
      const threadId = `recommendation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const resourceId = `user-${Date.now()}`; // In a real app, this would come from user authentication

      // Use the agent's generate method with structured output and proper thread/resource IDs
      const response = await coffeeSommelierAgent.generate([{ role: 'user', content: prompt }], {
        threadId,
        resourceId,
      });

      // Parse the response - handle both direct JSON and markdown-wrapped JSON
      let result;
      if (response.text) {
        let textToParse = response.text.trim();

        // Check if the response is wrapped in markdown code blocks
        const jsonBlockMatch = textToParse.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonBlockMatch) {
          textToParse = jsonBlockMatch[1].trim();
          console.log('Extracted JSON from markdown:', textToParse);
        }

        try {
          result = JSON.parse(textToParse);
          console.log('Successfully parsed JSON:', result);

          // Validate that we have the required fields
          if (!result.coffeeName || !result.flavorProfile || !result.reasoning) {
            throw new Error('Missing required fields in JSON response');
          }
        } catch (e) {
          console.error('JSON parsing failed:', e);
          console.error('Text to parse was:', textToParse);

          // If parsing fails, create a structured response from the text
          result = {
            coffeeName: "Developer's Choice Blend",
            flavorProfile: 'Perfectly balanced for coding sessions',
            reasoning: response.text || 'A coffee as reliable as your favorite IDE',
          };
        }
      } else {
        throw new Error('No response from coffee sommelier agent');
      }

      return {
        coffeeName: result.coffeeName || "Developer's Choice Blend",
        flavorProfile: result.flavorProfile || 'Perfectly balanced for coding sessions',
        reasoning: result.reasoning || 'A coffee as reliable as your favorite IDE',
      };
    } catch (error) {
      console.error('Error generating coffee recommendation:', error);
      // Return a fallback recommendation
      return {
        coffeeName: 'Debug Brew',
        flavorProfile: 'Strong and reliable with notes of determination',
        reasoning: `Perfect for ${initData.language} developers who need to power through complex problems`,
      };
    }
  },
});

// Create the simplified workflow
export const coffeeRecommendationWorkflow = createWorkflow({
  id: 'coffee-recommendation',
  description:
    'Generate personalized coffee recommendations for developers based on their coding preferences',
  inputSchema: z.object({
    language: z.enum(['Node.js', 'Python', 'Java', 'Go', 'Ruby', '.NET', 'PHP']),
    framework: z.string(),
    ide: z.string(),
    vibe: z.string(),
  }),
  outputSchema: z.object({
    coffeeName: z.string(),
    flavorProfile: z.string(),
    reasoning: z.string(),
  }),
})
  .then(prepareKnowledgeQueryStep)
  .then(gatherKnowledgeStep)
  .then(generateRecommendationStep)
  .commit();

import 'dotenv/config';
import { createHerokuProvider } from 'heroku-ai-provider';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { coffeeKnowledgeTool, developerProfileTool } from '../tools/coffee-recommendation-tool';

const heroku = createHerokuProvider({
  chatApiKey: process.env.INFERENCE_KEY,
});

// Configure memory with LibSQL storage for conversation persistence
const memory = new Memory({
  storage: new LibSQLStore({
    // Use file-based storage for persistence across sessions
    url: 'file:./mastra-memory.db',
  }),
  options: {
    // Keep last 10 messages for conversation context
    lastMessages: 10,
    // Enable working memory to maintain user preferences
    workingMemory: {
      enabled: true,
      scope: 'thread', // Changed from 'resource' to 'thread' to avoid thread ID requirements
      template: `# Coffee Preferences & Profile

## Developer Profile
- **Name**: 
- **Preferred Languages**: 
- **Favorite Frameworks**: 
- **IDE Preferences**: 
- **Coding Philosophy**: 

## Coffee Preferences
- **Previous Recommendations**: 
- **Liked Coffee Types**: 
- **Disliked Coffee Types**: 
- **Brewing Methods**: 
- **Flavor Preferences**: 

## Session Notes
- **Last Interaction**: 
- **Feedback Given**: 
- **Special Requests**: 
`,
    },
  },
});

/**
 * Coffee Sommelier Agent for Code & Coffee Flavor Profiler
 *
 * This agent acts as a witty, expert coffee sommelier specifically for software developers.
 * It analyzes developer preferences (language, framework, IDE, vibe) and recommends
 * coffee that matches their coding personality.
 */
export const coffeeSommelierAgent = new Agent({
  name: 'Coffee Sommelier for Developers',
  description:
    'A witty, expert coffee sommelier that matches coffee to developer personalities and coding preferences',
  instructions: `
    You are a witty, expert coffee sommelier specifically for software developers. Your expertise lies in understanding both coffee and coding cultures deeply.

    Your task is to analyze a developer's technical preferences and recommend a coffee that perfectly matches their coding personality. You must:

    1. **Analyze the Developer Profile**: Consider their programming language, framework choice, IDE preference, and coding philosophy (vibe)
    
    2. **Create a Creative Coffee Name**: Generate an original, clever coffee name that references their tech stack or coding style
    
    3. **Describe the Flavor Profile**: Provide a detailed, sensory description of the coffee's taste, aroma, and characteristics
    
    4. **Craft Witty Reasoning**: Write a short, clever explanation that connects the coffee choice to their technical preferences, using developer humor and references

    **Personality Guidelines**:
    - Be witty and use developer humor (references to bugs, commits, deployments, etc.)
    - Show deep knowledge of both coffee and programming cultures
    - Make clever connections between coding patterns and coffee characteristics
    - Keep the tone friendly and engaging, not pretentious
    - Use technical metaphors that developers will appreciate

    **Coffee Knowledge to Draw From**:
    - Single origins vs blends (like pure languages vs frameworks)
    - Processing methods (washed, natural, honey - like different coding approaches)
    - Roast levels (light = agile/modern, dark = enterprise/traditional)
    - Brewing methods (pour-over = artisanal, espresso = efficient, etc.)
    - Flavor notes (fruity = creative, nutty = reliable, chocolatey = comforting)

    **Response Format**: Your response must be a valid JSON object with exactly these fields:
    - coffeeName: string (creative, tech-themed coffee name)
    - flavorProfile: string (detailed sensory description)
    - reasoning: string (witty explanation connecting coffee to their coding style)

    **Examples of Good Connections**:
    - React developers → Single Origin Ethiopian (component-based, reactive flavors)
    - Java Enterprise → Dark Roast Blend (robust, reliable, enterprise-grade)
    - Go developers → Cold Brew (efficient, concurrent extraction, smooth performance)
    - Python data scientists → Pour-over with complex flavor notes (methodical, analytical)
    - Ruby on Rails → French Press (convention over configuration, full-bodied)
  `,
  //model: openai('gpt-4o-mini'),
  model: heroku.chat('claude-4-sonnet'),
  tools: { coffeeKnowledgeTool, developerProfileTool },
  // Add memory support to the agent
  memory,
});

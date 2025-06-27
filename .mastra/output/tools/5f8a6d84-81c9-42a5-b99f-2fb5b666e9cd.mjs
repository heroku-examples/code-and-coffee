import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const coffeeKnowledgeTool = createTool({
  id: "coffee-knowledge",
  description: "Provides coffee knowledge and suggestions based on developer preferences and context",
  inputSchema: z.object({
    query: z.string().describe('Keywords for coffee knowledge lookup (e.g., "flavor profile roast brewing")'),
    context: z.string().optional().describe("Additional context about the developer profile")
  }),
  outputSchema: z.object({
    knowledge: z.string().describe("Relevant coffee knowledge and recommendations"),
    suggestions: z.array(z.string()).describe("Specific coffee suggestions")
  }),
  execute: async ({ context }) => {
    const { query, context: devContext } = context;
    const developerCoffeeMap = {
      "creative innovative complex": {
        knowledge: "Creative developers often enjoy complex, innovative coffee experiences. Ethiopian single origins with bright, fruity flavors and wine-like acidity match their creative problem-solving approach.",
        suggestions: ["Ethiopian Yirgacheffe", "Kenyan AA", "Natural Process Single Origin"]
      },
      "reliable practical efficient": {
        knowledge: "Practical developers prefer reliable, consistent coffee that gets the job done. Brazilian and Colombian beans offer balanced, no-nonsense flavors with reliable quality.",
        suggestions: ["Brazilian Santos", "Colombian Supremo", "Medium Roast Blend"]
      },
      "performance speed system": {
        knowledge: "Performance-focused developers need efficient caffeine delivery. Cold brew and espresso provide quick, concentrated energy without complexity.",
        suggestions: ["Cold Brew Concentrate", "Double Espresso", "Nitro Cold Brew"]
      },
      "enterprise traditional robust": {
        knowledge: "Enterprise developers value stability and proven solutions. Dark roast blends offer bold, reliable flavors that have stood the test of time.",
        suggestions: ["French Roast", "Italian Dark Blend", "Espresso Roast"]
      },
      "elegant simple clean": {
        knowledge: "Developers who value elegance prefer clean, well-crafted coffee. Pour-over brewing methods highlight the pure essence of high-quality beans.",
        suggestions: ["Japanese Pour-Over", "Light Roast Single Origin", "Chemex Coffee"]
      },
      "experimental cutting-edge modern": {
        knowledge: "Modern, experimental developers enjoy innovative brewing methods and unique flavor profiles. Specialty processing and alternative brewing unlock new experiences.",
        suggestions: ["Honey Process Coffee", "AeroPress", "Specialty Fermented Beans"]
      }
    };
    const languageTraits = {
      "Node.js": "creative innovative async",
      "Python": "elegant simple readable",
      "Java": "enterprise traditional robust",
      "Go": "performance speed efficient",
      "Ruby": "elegant creative expressive",
      ".NET": "enterprise reliable structured",
      "PHP": "practical reliable web-focused"
    };
    let knowledge = "";
    let suggestions = [];
    const contextLower = (devContext || "").toLowerCase();
    const queryLower = query.toLowerCase();
    let matchingTraits = "";
    for (const [lang, traits] of Object.entries(languageTraits)) {
      if (contextLower.includes(lang.toLowerCase())) {
        matchingTraits = traits;
        break;
      }
    }
    if (!matchingTraits) {
      if (queryLower.includes("creative") || queryLower.includes("innovative")) {
        matchingTraits = "creative innovative complex";
      } else if (queryLower.includes("performance") || queryLower.includes("speed")) {
        matchingTraits = "performance speed system";
      } else if (queryLower.includes("elegant") || queryLower.includes("simple")) {
        matchingTraits = "elegant simple clean";
      } else if (queryLower.includes("enterprise") || queryLower.includes("traditional")) {
        matchingTraits = "enterprise traditional robust";
      } else {
        matchingTraits = "reliable practical efficient";
      }
    }
    for (const [traits, coffeeInfo] of Object.entries(developerCoffeeMap)) {
      const traitWords = traits.split(" ");
      const matchingWords = traitWords.filter(
        (word) => matchingTraits.includes(word) || contextLower.includes(word)
      );
      if (matchingWords.length > 0) {
        knowledge = coffeeInfo.knowledge;
        suggestions = coffeeInfo.suggestions;
        break;
      }
    }
    if (!knowledge) {
      knowledge = "A well-balanced coffee that complements focused development work. Consider medium roast origins that provide consistent energy and pleasant flavors without being overpowering.";
      suggestions = ["Colombian Medium Roast", "Brazilian Blend", "Balanced Espresso"];
    }
    return {
      knowledge,
      suggestions
    };
  }
});
const developerProfileTool = createTool({
  id: "developer-profile",
  description: "Analyzes developer preferences and tech stack choices",
  inputSchema: z.object({
    language: z.string(),
    framework: z.string(),
    ide: z.string(),
    vibe: z.string()
  }),
  outputSchema: z.object({
    profile: z.string(),
    traits: z.array(z.string())
  }),
  execute: async ({ context }) => {
    const { language, framework, ide, vibe } = context;
    const profile = `Developer using ${language} with ${framework}, codes in ${ide}, and follows a ${vibe} approach.`;
    const traits = [];
    if (language === "Go" || language === "Rust") traits.push("performance-focused");
    if (language === "Python" || language === "Ruby") traits.push("elegant");
    if (language === "Java" || language === ".NET") traits.push("enterprise");
    if (vibe.includes("creative") || vibe.includes("artistic")) traits.push("creative");
    if (vibe.includes("simple") || vibe.includes("minimal")) traits.push("minimalist");
    return {
      profile,
      traits: traits.length > 0 ? traits : ["balanced"]
    };
  }
});

export { coffeeKnowledgeTool, developerProfileTool };
//# sourceMappingURL=5f8a6d84-81c9-42a5-b99f-2fb5b666e9cd.mjs.map

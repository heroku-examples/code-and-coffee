# Code & Coffee Flavor Profiler

A developer-friendly coffee recommendation system. Match your coding style with the perfect coffee blend using AI-powered recommendations!

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm typecheck
```

## 🤖 AI-Powered Coffee Sommelier

This app features a sophisticated **Mastra AI agent** that acts as your personal coffee sommelier for developers. The agent:

- **Analyzes Developer Profiles:** Understands your programming language, framework, IDE, and coding philosophy
- **Matches Coffee to Code:** Creates clever connections between your tech stack and coffee characteristics
- **Generates Creative Names:** Produces witty, tech-themed coffee names like "Async Espresso" or "Debug Brew"
- **Provides Expert Reasoning:** Offers detailed explanations connecting your coding style to coffee preferences
- **Maintains Context:** Uses working memory to remember preferences within recommendation sessions

### Agent Capabilities

- **Multi-Tool Workflow:** Combines coffee knowledge lookup with developer profile analysis
- **Research-Backed Recommendations:** Can leverage research capabilities for informed suggestions
- **Structured Output:** Guarantees consistent JSON responses with coffee name, flavor profile, and reasoning
- **Error Handling:** Graceful fallbacks ensure users always receive a recommendation
- **Memory Management:** Thread-scoped working memory for contextual conversations

## 📡 API Endpoints

### Health Check

```bash
GET /api/health
```

Response:

```json
{
  "status": "ok",
  "message": "Code & Coffee API is running",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "version": "1.0.0"
}
```

### Coffee Recommendation

```bash
POST /api/recommendation
```

Request body:

```json
{
  "language": "Node.js",
  "framework": "Express",
  "ide": "VS Code",
  "vibe": "elegantly-simple"
}
```

Response:

```json
{
  "coffeeName": "Async Espresso",
  "flavorProfile": "Bold and efficient with notes of vanilla and a smooth, non-blocking finish",
  "reasoning": "Like Node.js, this espresso is single-threaded but powerful. Its event-driven flavor profile matches your async coding style perfectly."
}
```

**Supported Languages:** `Node.js`, `Python`, `Java`, `Go`, `Ruby`, `.NET`, `PHP`

## 🧪 Testing the API

```bash
# Test health endpoint
curl http://localhost:5173/api/health

# Test recommendation endpoint
curl -X POST http://localhost:5173/api/recommendation \
  -H "Content-Type: application/json" \
  -d '{"language":"Python","framework":"Django","ide":"PyCharm","vibe":"data-driven"}'
```

## 🏗️ Architecture

- **Frontend:** React Router v7 with TypeScript and TailwindCSS
- **Backend:** React Router v7 Server-Side API Routes (no Express needed!)
- **AI Agent:** Mastra AI Coffee Sommelier with working memory and multi-tool capabilities
- **AI Provider:** Heroku AI with Claude 4 Sonnet for intelligent recommendations
- **Storage:** LibSQL for persistent agent memory and conversation history
- **Workflow Engine:** Mastra workflows for complex recommendation generation
- **Validation:** Zod for runtime type validation + custom TypeScript interfaces
- **Testing:** Vitest with 30+ test cases covering API contract and endpoints

## 📱 iPad Kiosk Design

This application is specifically designed for iPad kiosk use at tech conferences:

### Touch-First Interface

- **Large Touch Targets:** All buttons are 60px+ height for easy finger interaction
- **No Hover States:** Designed for touch-only interaction
- **Clear Visual Feedback:** Active states and animations provide immediate feedback
- **Generous Spacing:** Prevents accidental touches with adequate margins

### iPad-Optimized Layout

- **Portrait Orientation:** Optimized for how iPads are typically held
- **Single-Column Flow:** Clean, focused user journey through quiz questions
- **Bottom-Aligned Actions:** Primary buttons positioned for comfortable thumb reach
- **High Contrast:** Readable in bright conference lighting conditions

### User Experience

- **Progress Indicators:** Clear visual progress through the 4-question quiz
- **Large Typography:** 18px+ font sizes for easy reading
- **Immersive Full-Screen:** Distraction-free kiosk experience
- **Simple Navigation:** Back buttons and clear next steps

## 📝 Development Notes

This project uses React Router v7's built-in server-side functionality for API routes instead of a separate Express server. This provides:

- ✅ Single codebase for frontend and backend
- ✅ Built-in TypeScript support
- ✅ Shared type definitions between client and server
- ✅ No additional server setup required

The Mastra AI integration uses:

- ✅ **Agent-based Architecture:** Sophisticated AI agent with specialized instructions
- ✅ **Multi-tool Workflows:** Combines knowledge lookup with profile analysis
- ✅ **Working Memory:** Maintains context within recommendation sessions
- ✅ **Structured Output:** Reliable JSON responses with error handling
- ✅ **Heroku AI Integration:** Claude 4 Sonnet for high-quality recommendations

## 🎯 Current Features

- ✅ **API Contract:** Comprehensive TypeScript interfaces for type safety
- ✅ **Backend API:** React Router v7 server-side endpoints with validation
- ✅ **iPad-Optimized UI:** Touch-first interface with large buttons and clear navigation
- ✅ **AI Coffee Sommelier:** Mastra agent with working memory and multi-tool capabilities
- ✅ **Intelligent Recommendations:** Context-aware coffee suggestions based on developer profiles
- ✅ **Persistent Memory:** LibSQL storage for agent memory and conversation history
- ✅ **Workflow Orchestration:** Complex recommendation generation with error handling

## 🔍 Project Structure

```
app/
├── routes/
│   ├── api.health.ts          # Health check endpoint
│   ├── api.recommendation.ts  # Main recommendation API with Mastra integration
│   ├── home.tsx              # Frontend home (redirects to welcome)
│   ├── welcome.tsx           # Welcome screen with CTA
│   ├── quiz.language.tsx     # Language selection quiz
│   ├── quiz.framework.tsx    # Framework selection quiz
│   ├── quiz.ide.tsx          # IDE selection quiz
│   ├── quiz.vibe.tsx         # Coding vibe quiz
│   ├── loading.tsx           # Loading animation
│   └── result.tsx            # Coffee recommendation result
├── types/
│   ├── api.ts                # API contract interfaces
│   ├── validation.ts         # Runtime validation & test data
│   └── index.ts              # Type exports
├── components/ui/            # shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── badge.tsx
└── routes.ts                 # Route configuration
src/mastra/
├── agents/
│   └── coffee-sommelier-agent.ts  # AI Coffee Sommelier Agent
├── tools/
│   └── coffee-recommendation-tool.ts  # Coffee knowledge and profile tools
├── workflows/
│   └── coffee-recommendation-workflow.ts  # Multi-step recommendation workflow
└── index.ts                  # Mastra configuration
```

import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('welcome', 'routes/welcome.tsx'),
  route('loading', 'routes/loading.tsx'),
  route('quiz/vibe', 'routes/quiz.vibe.tsx'),
  route('quiz/language', 'routes/quiz.language.tsx'),
  route('quiz/tool', 'routes/quiz.tool.tsx'),
  route('quiz/ide', 'routes/quiz.ide.tsx'),
  route('result', 'routes/result.tsx'),
  route('stats', 'routes/stats.tsx'),
  route('api/health', 'routes/api.health.ts'),
  route('api/recommendation', 'routes/api.recommendation.ts'),
  route('api/responses', 'routes/api.responses.ts'),
  route('api/stats', 'routes/api.stats.ts'),
] satisfies RouteConfig;

import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('welcome', 'routes/welcome.tsx'),
  route('quiz/language', 'routes/quiz.language.tsx'),
  route('quiz/tool', 'routes/quiz.tool.tsx'),
  route('quiz/ide', 'routes/quiz.ide.tsx'),
  route('quiz/vibe', 'routes/quiz.vibe.tsx'),
  route('loading', 'routes/loading.tsx'),
  route('result', 'routes/result.tsx'),
  route('api/health', 'routes/api.health.ts'),
  route('api/recommendation', 'routes/api.recommendation.ts'),
] satisfies RouteConfig;

// Export all API contract types and utilities
export type {
  ProgrammingLanguage,
  RecommendationRequest,
  RecommendationResponse,
  ApiErrorResponse,
} from './api';

export { QUIZ_OPTIONS } from './api';

export {
  validateRecommendationRequest,
  validateRecommendationResponse,
  sampleRequest,
  sampleResponse,
  sampleRequests,
  runApiContractTests,
} from './validation';

import type { RecommendationRequest, RecommendationResponse, ProgrammingLanguage } from './api';

/**
 * Validates that a recommendation request conforms to the expected interface
 */
export function validateRecommendationRequest(data: unknown): data is RecommendationRequest {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const req = data as Record<string, unknown>;

  // Check required fields exist and have correct types
  if (
    typeof req.language !== 'string' ||
    typeof req.framework !== 'string' ||
    typeof req.ide !== 'string' ||
    typeof req.vibe !== 'string'
  ) {
    return false;
  }

  // Validate language is one of the allowed values
  const validLanguages: ProgrammingLanguage[] = [
    'Node.js',
    'Python',
    'Java',
    'Go',
    'Ruby',
    '.NET',
    'PHP',
  ];
  if (!validLanguages.includes(req.language as ProgrammingLanguage)) {
    return false;
  }

  return true;
}

/**
 * Validates that a recommendation response conforms to the expected interface
 */
export function validateRecommendationResponse(data: unknown): data is RecommendationResponse {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const res = data as Record<string, unknown>;

  // Check all required fields exist and are strings
  return (
    typeof res.coffeeName === 'string' &&
    typeof res.flavorProfile === 'string' &&
    typeof res.reasoning === 'string' &&
    res.coffeeName.length > 0 &&
    res.flavorProfile.length > 0 &&
    res.reasoning.length > 0
  );
}

/**
 * Sample valid request for testing
 */
export const sampleRequest: RecommendationRequest = {
  language: 'Node.js',
  framework: 'Express.js',
  ide: 'VS Code',
  vibe: 'elegantly-simple',
};

/**
 * Sample valid response for testing
 */
export const sampleResponse: RecommendationResponse = {
  coffeeName: 'Async Espresso',
  flavorProfile: 'Bold and efficient with notes of vanilla and a smooth finish',
  reasoning:
    "Like Node.js, this espresso is single-threaded but powerful - it gets things done fast and efficiently. The VS Code setup suggests you appreciate clean, streamlined tools, and the elegant simplicity vibe calls for a coffee that's refined but not overcomplicated. This espresso delivers maximum impact with minimal fuss, just like your code.",
};

/**
 * Additional sample requests for different combinations
 */
export const sampleRequests: RecommendationRequest[] = [
  {
    language: 'Python',
    framework: 'Django',
    ide: 'VS Code',
    vibe: 'performance-obsessed',
  },
  {
    language: 'Go',
    framework: 'Gin',
    ide: 'NeoVim',
    vibe: 'cutting-edge-explorer',
  },
  {
    language: 'Java',
    framework: 'Spring Boot',
    ide: 'JetBrains',
    vibe: 'elegantly-simple',
  },
];

/**
 * Test function to verify TypeScript compilation and validation
 */
export function runApiContractTests(): boolean {
  console.log('Testing API Contract Interfaces...');

  // Test sample request validation
  const isValidRequest = validateRecommendationRequest(sampleRequest);
  console.log('Sample request validation:', isValidRequest);

  // Test sample response validation
  const isValidResponse = validateRecommendationResponse(sampleResponse);
  console.log('Sample response validation:', isValidResponse);

  // Test invalid data
  const invalidRequest = { language: 'InvalidLang', tool: 123, vibe: null };
  const isInvalidRequest = validateRecommendationRequest(invalidRequest);
  console.log('Invalid request correctly rejected:', !isInvalidRequest);

  // Test all sample requests
  const allRequestsValid = sampleRequests.every(validateRecommendationRequest);
  console.log('All sample requests valid:', allRequestsValid);

  return isValidRequest && isValidResponse && !isInvalidRequest && allRequestsValid;
}

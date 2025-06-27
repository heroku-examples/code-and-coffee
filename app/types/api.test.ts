import { describe, it, expect } from 'vitest';
import {
  QUIZ_OPTIONS,
  type RecommendationRequest,
  type RecommendationResponse,
  type ProgrammingLanguage,
} from './api';
import {
  validateRecommendationRequest,
  validateRecommendationResponse,
  sampleRequest,
  sampleResponse,
  sampleRequests,
} from './validation';

describe('API Contract Types', () => {
  describe('ProgrammingLanguage Type', () => {
    it('should include all expected languages', () => {
      const expectedLanguages = ['Node.js', 'Python', 'Java', 'Go', 'Ruby', '.NET', 'PHP'];
      const quizLanguages = QUIZ_OPTIONS.languages.map(lang => lang.value);

      expectedLanguages.forEach(lang => {
        expect(quizLanguages).toContain(lang);
      });
    });
  });

  describe('QUIZ_OPTIONS', () => {
    it('should have languages with proper structure', () => {
      QUIZ_OPTIONS.languages.forEach(lang => {
        expect(lang).toHaveProperty('value');
        expect(lang).toHaveProperty('label');
        expect(lang).toHaveProperty('iconName');
        expect(typeof lang.value).toBe('string');
        expect(typeof lang.label).toBe('string');
        expect(typeof lang.iconName).toBe('string');
      });
    });

    it('should have frameworks with proper structure', () => {
      Object.values(QUIZ_OPTIONS.frameworks).forEach(frameworks => {
        frameworks.forEach(framework => {
          expect(framework).toHaveProperty('value');
          expect(framework).toHaveProperty('label');
          expect(typeof framework.value).toBe('string');
          expect(typeof framework.label).toBe('string');
        });
      });
    });

    it('should have IDEs with proper structure', () => {
      QUIZ_OPTIONS.ides.forEach(ide => {
        expect(ide).toHaveProperty('value');
        expect(ide).toHaveProperty('label');
        expect(typeof ide.value).toBe('string');
        expect(typeof ide.label).toBe('string');
      });
    });

    it('should have vibes with proper structure', () => {
      QUIZ_OPTIONS.vibes.forEach(vibe => {
        expect(vibe).toHaveProperty('value');
        expect(vibe).toHaveProperty('label');
        expect(vibe).toHaveProperty('description');
        expect(typeof vibe.value).toBe('string');
        expect(typeof vibe.label).toBe('string');
        expect(typeof vibe.description).toBe('string');
      });
    });

    it('should have expected number of options', () => {
      expect(QUIZ_OPTIONS.languages).toHaveLength(7);
      expect(Object.keys(QUIZ_OPTIONS.frameworks)).toHaveLength(7); // One for each language
      expect(QUIZ_OPTIONS.ides.length).toBeGreaterThanOrEqual(9);
      expect(QUIZ_OPTIONS.vibes).toHaveLength(6); // Updated to reflect current vibe options
    });
  });
});

describe('Request Validation', () => {
  describe('validateRecommendationRequest', () => {
    it('should validate correct request structure', () => {
      const validRequest: RecommendationRequest = {
        language: 'Node.js',
        framework: 'Express.js',
        ide: 'VS Code',
        vibe: 'elegantly-simple',
      };

      expect(validateRecommendationRequest(validRequest)).toBe(true);
    });

    it('should reject invalid language', () => {
      const invalidRequest = {
        language: 'InvalidLanguage',
        framework: 'Express.js',
        ide: 'VS Code',
        vibe: 'elegantly-simple',
      };

      expect(validateRecommendationRequest(invalidRequest)).toBe(false);
    });

    it('should reject missing fields', () => {
      const incompleteRequest = {
        language: 'Node.js',
        framework: 'Express.js',
        // missing ide and vibe
      };

      expect(validateRecommendationRequest(incompleteRequest)).toBe(false);
    });

    it('should reject wrong field types', () => {
      const wrongTypesRequest = {
        language: 'Node.js',
        framework: 123, // should be string
        ide: 'VS Code',
        vibe: 'elegantly-simple',
      };

      expect(validateRecommendationRequest(wrongTypesRequest)).toBe(false);
    });

    it('should reject null/undefined', () => {
      expect(validateRecommendationRequest(null)).toBe(false);
      expect(validateRecommendationRequest(undefined)).toBe(false);
      expect(validateRecommendationRequest({})).toBe(false);
    });

    it('should validate all sample requests', () => {
      sampleRequests.forEach((request, index) => {
        expect(
          validateRecommendationRequest(request),
          `Sample request ${index} should be valid`
        ).toBe(true);
      });
    });

    it('should validate all programming languages from QUIZ_OPTIONS', () => {
      QUIZ_OPTIONS.languages.forEach(lang => {
        const request: RecommendationRequest = {
          language: lang.value,
          framework: 'Express.js',
          ide: 'VS Code',
          vibe: 'elegantly-simple',
        };
        expect(
          validateRecommendationRequest(request),
          `Language ${lang.value} should be valid`
        ).toBe(true);
      });
    });
  });
});

describe('Response Validation', () => {
  describe('validateRecommendationResponse', () => {
    it('should validate correct response structure', () => {
      const validResponse: RecommendationResponse = {
        coffeeName: 'Async Espresso',
        flavorProfile: 'Bold and efficient with notes of vanilla',
        reasoning: 'Perfect for Node.js developers who value efficiency',
      };

      expect(validateRecommendationResponse(validResponse)).toBe(true);
    });

    it('should reject missing fields', () => {
      const incompleteResponse = {
        coffeeName: 'Test Coffee',
        flavorProfile: 'Great taste',
        // missing reasoning
      };

      expect(validateRecommendationResponse(incompleteResponse)).toBe(false);
    });

    it('should reject empty strings', () => {
      const emptyFieldsResponse = {
        coffeeName: '',
        flavorProfile: 'Great taste',
        reasoning: 'Perfect match',
      };

      expect(validateRecommendationResponse(emptyFieldsResponse)).toBe(false);
    });

    it('should reject wrong field types', () => {
      const wrongTypesResponse = {
        coffeeName: 123, // should be string
        flavorProfile: 'Great taste',
        reasoning: 'Perfect match',
      };

      expect(validateRecommendationResponse(wrongTypesResponse)).toBe(false);
    });

    it('should reject null/undefined', () => {
      expect(validateRecommendationResponse(null)).toBe(false);
      expect(validateRecommendationResponse(undefined)).toBe(false);
      expect(validateRecommendationResponse({})).toBe(false);
    });

    it('should validate sample response', () => {
      expect(validateRecommendationResponse(sampleResponse)).toBe(true);
    });
  });
});

describe('Sample Data', () => {
  it('should provide valid sample request', () => {
    expect(validateRecommendationRequest(sampleRequest)).toBe(true);
    expect(sampleRequest).toHaveProperty('language');
    expect(sampleRequest).toHaveProperty('framework');
    expect(sampleRequest).toHaveProperty('ide');
    expect(sampleRequest).toHaveProperty('vibe');
  });

  it('should provide valid sample response', () => {
    expect(validateRecommendationResponse(sampleResponse)).toBe(true);
    expect(sampleResponse).toHaveProperty('coffeeName');
    expect(sampleResponse).toHaveProperty('flavorProfile');
    expect(sampleResponse).toHaveProperty('reasoning');
  });

  it('should provide multiple valid sample requests', () => {
    expect(sampleRequests.length).toBeGreaterThan(0);
    sampleRequests.forEach((request, index) => {
      expect(
        validateRecommendationRequest(request),
        `Sample request ${index} should be valid`
      ).toBe(true);
    });
  });
});

describe('Type Safety Integration', () => {
  it('should compile with TypeScript strict mode', () => {
    // This test passes if the file compiles without errors
    const request: RecommendationRequest = sampleRequest;
    const response: RecommendationResponse = sampleResponse;

    expect(request.language).toBeDefined();
    expect(response.coffeeName).toBeDefined();
  });

  it('should enforce language type constraints', () => {
    // This would cause a TypeScript error if uncommented:
    // const invalidRequest: RecommendationRequest = {
    //   language: 'InvalidLang', // Error: not assignable to ProgrammingLanguage
    //   tool: 'VS Code',
    //   vibe: 'elegantly-simple'
    // }

    // Instead, test that valid languages work
    const validLanguages: ProgrammingLanguage[] = [
      'Node.js',
      'Python',
      'Java',
      'Go',
      'Ruby',
      '.NET',
      'PHP',
    ];
    validLanguages.forEach(lang => {
      const request: RecommendationRequest = {
        language: lang,
        framework: 'Express.js',
        ide: 'VS Code',
        vibe: 'elegantly-simple',
      };
      expect(request.language).toBe(lang);
    });
  });
});

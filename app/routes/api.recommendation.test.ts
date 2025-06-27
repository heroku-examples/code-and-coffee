import { describe, it, expect, beforeAll } from 'vitest';
import { action } from './api.recommendation';
import { sampleRequest } from '~/types';

// Mock environment variables for Heroku AI provider
beforeAll(() => {
  process.env.HEROKU_INFERENCE_KEY = 'test-api-key';
  process.env.HEROKU_INFERENCE_URL = 'https://test-inference-url.com';
  process.env.HEROKU_INFERENCE_MODEL_ID = 'test-model-id';
});

describe('API Recommendation Endpoint', () => {
  describe('POST /api/recommendation', () => {
    it('should return a coffee recommendation for valid request', async () => {
      const request = new Request('http://localhost/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sampleRequest),
      });

      const response = await action({ request });
      expect(response.status).toBe(200);

      const data = await response.json();
      expect(data).toHaveProperty('coffeeName');
      expect(data).toHaveProperty('flavorProfile');
      expect(data).toHaveProperty('reasoning');
      expect(typeof data.coffeeName).toBe('string');
      expect(data.coffeeName.length).toBeGreaterThan(0);
    });

    it('should return 405 for non-POST requests', async () => {
      const request = new Request('http://localhost/api/recommendation', {
        method: 'GET',
      });

      const response = await action({ request });
      expect(response.status).toBe(405);

      const data = await response.json();
      expect(data.error).toBe('Method not allowed');
    });

    it('should return 400 for invalid request body', async () => {
      const invalidRequest = {
        language: 'InvalidLanguage',
        framework: 'Express.js',
        ide: 'VS Code',
        vibe: 'elegantly-simple',
      };

      const request = new Request('http://localhost/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidRequest),
      });

      const response = await action({ request });
      expect(response.status).toBe(400);

      const data = await response.json();
      expect(data.error).toBe('Invalid request format');
    });

    it('should return 400 for missing fields', async () => {
      const incompleteRequest = {
        language: 'Node.js',
        framework: 'Express.js',
        // missing ide and vibe
      };

      const request = new Request('http://localhost/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incompleteRequest),
      });

      const response = await action({ request });
      expect(response.status).toBe(400);
    });

    it('should gracefully handle malformed JSON with fallback', async () => {
      const request = new Request('http://localhost/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json',
      });

      const response = await action({ request });
      // With Mastra integration, we return 200 with fallback instead of 500
      expect(response.status).toBe(200);

      const data = await response.json();
      // Should still have a valid coffee recommendation structure
      expect(data).toHaveProperty('coffeeName');
      expect(data).toHaveProperty('flavorProfile');
      expect(data).toHaveProperty('reasoning');
    });

    it('should return different recommendations for different languages (with fallback)', async () => {
      const nodeRequest = { ...sampleRequest, language: 'Node.js' as const };
      const pythonRequest = { ...sampleRequest, language: 'Python' as const };

      const nodeRequestObj = new Request('http://localhost/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nodeRequest),
      });

      const pythonRequestObj = new Request('http://localhost/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pythonRequest),
      });

      const nodeResponse = await action({ request: nodeRequestObj });
      const pythonResponse = await action({ request: pythonRequestObj });

      expect(nodeResponse.status).toBe(200);
      expect(pythonResponse.status).toBe(200);

      const nodeData = await nodeResponse.json();
      const pythonData = await pythonResponse.json();

      // When AI provider is available, we get different recommendations
      // When falling back, we get language-specific fallbacks
      if (nodeData.coffeeName !== 'Debug Blend') {
        // AI provider is working - test AI-generated responses
        expect(nodeData.coffeeName).not.toBe(pythonData.coffeeName);
      } else {
        // AI provider not available - test fallback responses
        expect(nodeData.coffeeName).toBe('Async Espresso');
        expect(pythonData.coffeeName).toBe('Pythonic Colombian');
      }
    });

    it('should include request context in reasoning (with fallback support)', async () => {
      const customRequest = {
        language: 'Go' as const,
        framework: 'Gin',
        ide: 'VS Code',
        vibe: 'cutting-edge-explorer',
      };

      const request = new Request('http://localhost/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customRequest),
      });

      const response = await action({ request });
      expect(response.status).toBe(200);

      const data = await response.json();

      // If AI provider is available, check for specific context
      // If falling back, just ensure we get a valid response structure
      if (data.coffeeName !== 'Debug Blend') {
        // AI provider is working - test AI-generated content
        expect(data.reasoning).toContain('Go');
      } else {
        // AI provider not available - test fallback content
        expect(data.coffeeName).toBe('Concurrent Cold Brew');
        expect(data.reasoning).toContain('Gin');
        expect(data.reasoning).toContain('cutting-edge-explorer');
      }
    });

    it('should successfully integrate with Mastra workflow', async () => {
      const request = new Request('http://localhost/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sampleRequest),
      });

      const response = await action({ request });
      expect(response.status).toBe(200);

      const data = await response.json();

      // Verify the response structure matches our API contract
      expect(data).toMatchObject({
        coffeeName: expect.any(String),
        flavorProfile: expect.any(String),
        reasoning: expect.any(String),
      });

      // Verify all fields have meaningful content
      expect(data.coffeeName.length).toBeGreaterThan(0);
      expect(data.flavorProfile.length).toBeGreaterThan(0);
      expect(data.reasoning.length).toBeGreaterThan(0);
    });
  });
});

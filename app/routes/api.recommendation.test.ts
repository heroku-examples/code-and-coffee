import { describe, it, expect, vi, beforeEach } from 'vitest';
import { action } from './api.recommendation';
import type { ActionFunctionArgs } from 'react-router';

// Mock the Mastra workflow
vi.mock('../../src/mastra', () => ({
  mastra: {
    getWorkflow: vi.fn(() => ({
      createRunAsync: vi.fn(() => ({
        start: vi.fn(() => ({
          status: 'success',
          result: {
            coffeeName: 'Mock Coffee',
            flavorProfile: 'Mock flavor profile',
            reasoning: 'Mock reasoning',
          },
        })),
      })),
    })),
  },
}));

describe('API Recommendation Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 405 for GET requests', async () => {
    const request = new Request('http://localhost/api/recommendation', {
      method: 'GET',
    });

    const response = await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const data = await response.json();

    expect(response.status).toBe(405);
    expect(data.error).toBe('Method not allowed');
  });

  it('should return 400 for invalid request data', async () => {
    const request = new Request('http://localhost/api/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invalid: 'data' }),
    });

    const response = await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid request data');
  });

  it('should handle missing required fields', async () => {
    const request = new Request('http://localhost/api/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'Node.js',
        // Missing framework, ide, vibe
      }),
    });

    const response = await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid request data');
    expect(data.details).toBeDefined();
  });

  it('should return fallback recommendation when workflow fails', async () => {
    // Mock workflow to fail
    const { mastra } = await import('../../src/mastra');
    vi.mocked(mastra.getWorkflow).mockReturnValue({
      createRunAsync: vi.fn(() => ({
        start: vi.fn(() => ({
          status: 'error',
          result: null,
        })),
      })),
    } as any);

    const request = new Request('http://localhost/api/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'Node.js',
        framework: 'Express.js',
        ide: 'VS Code',
        vibe: 'elegantly-simple',
      }),
    });

    const response = await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.coffeeName).toBe('Debug Blend');
    expect(data.flavorProfile).toContain('robust, full-bodied coffee');
    expect(data.reasoning).toContain('reliable blend');
  });

  it('should return successful recommendation for valid input', async () => {
    const validRequest = {
      language: 'Node.js',
      framework: 'Express.js',
      ide: 'VS Code',
      vibe: 'elegantly-simple',
    };

    const nodeRequestObj = new Request('http://localhost/api/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validRequest),
    });

    const pythonRequestObj = new Request('http://localhost/api/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...validRequest, language: 'Python' }),
    });

    const nodeResponse = await action({
      request: nodeRequestObj,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const pythonResponse = await action({
      request: pythonRequestObj,
      params: {},
      context: {},
    } as ActionFunctionArgs);

    const nodeData = await nodeResponse.json();
    const pythonData = await pythonResponse.json();

    // Both should return successful responses
    expect(nodeResponse.status).toBe(200);
    expect(pythonResponse.status).toBe(200);

    // Both should have the required fields
    expect(nodeData).toHaveProperty('coffeeName');
    expect(nodeData).toHaveProperty('flavorProfile');
    expect(nodeData).toHaveProperty('reasoning');

    expect(pythonData).toHaveProperty('coffeeName');
    expect(pythonData).toHaveProperty('flavorProfile');
    expect(pythonData).toHaveProperty('reasoning');

    // Values should be strings
    expect(typeof nodeData.coffeeName).toBe('string');
    expect(typeof nodeData.flavorProfile).toBe('string');
    expect(typeof nodeData.reasoning).toBe('string');

    expect(typeof pythonData.coffeeName).toBe('string');
    expect(typeof pythonData.flavorProfile).toBe('string');
    expect(typeof pythonData.reasoning).toBe('string');
  });

  it('should handle all supported programming languages', async () => {
    const languages = ['Node.js', 'Python', 'Java', 'Go', 'Ruby', '.NET', 'PHP'];

    for (const language of languages) {
      const request = new Request('http://localhost/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          framework: 'Test Framework',
          ide: 'Test IDE',
          vibe: 'test-vibe',
        }),
      });

      const response = await action({
        request,
        params: {},
        context: {},
      } as ActionFunctionArgs);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('coffeeName');
      expect(data).toHaveProperty('flavorProfile');
      expect(data).toHaveProperty('reasoning');
    }
  });

  it('should handle malformed JSON', async () => {
    const request = new Request('http://localhost/api/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json',
    });

    const response = await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const data = await response.json();

    expect(response.status).toBe(200); // Should return fallback
    expect(data.coffeeName).toBe('Debug Blend');
  });

  it('should handle empty request body', async () => {
    const request = new Request('http://localhost/api/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '',
    });

    const response = await action({
      request,
      params: {},
      context: {},
    } as ActionFunctionArgs);
    const data = await response.json();

    expect(response.status).toBe(200); // Should return fallback
    expect(data.coffeeName).toBe('Debug Blend');
  });
});

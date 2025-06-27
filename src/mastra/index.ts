import 'dotenv/config';
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { coffeeRecommendationWorkflow } from './workflows/coffee-recommendation-workflow';
import { coffeeSommelierAgent } from './agents/coffee-sommelier-agent';

export const mastra = new Mastra({
  agents: { coffeeSommelierAgent },
  workflows: { coffeeRecommendationWorkflow },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ':memory:',
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});

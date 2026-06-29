import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { workflowsRouter } from './workflow.router';
import { credentialsRouter } from './credentials.router';

export const appRouter = createTRPCRouter({
  workflows:workflowsRouter,
  credentials:credentialsRouter,
});
 
// export type definition of API
export type AppRouter = typeof appRouter;
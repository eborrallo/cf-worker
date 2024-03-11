import { Hono } from 'hono';
import { registerRoutes } from './routes';
import type { ExecutionContext } from 'hono/dist/types/context';
import { registerConfig, registerDb, registerKv } from './dependency-injection';
import { Env } from './types';


export class Server {
	app: Hono<{ Bindings: Env }>;

	constructor() {
		this.app = new Hono<{ Bindings: Env }>();

		this.app.use(async (c, next) => {
			registerDb(c.env);
			registerKv(c.env);
			registerConfig(c.env);

			await next();
		});

		registerRoutes(this.app);
	}

	listen(): (request: Request, Env?: any, executionCtx?: ExecutionContext) => Response | Promise<Response> {
		return this.app.fetch;
	}

}

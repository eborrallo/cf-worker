import { ExecutionContext, ScheduledController } from '@cloudflare/workers-types/2023-07-01/index';
import { ApiApp } from './src/apps/api/ApiApp';
import { Env, Hono } from 'hono';

const app = new ApiApp()
export default {
	fetch: app.start(),
	scheduled: async (event: ScheduledController, env: Env, ctx: ExecutionContext) => {
		switch (event.cron) {
			case '* * * * *':
				// Every  minutes
				console.log('Every minutes');
				break;
		}
	}
};

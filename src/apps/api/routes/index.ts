import { Hono } from 'hono';
import * as auth from './auth.route';


export function registerRoutes(app: Hono<any>) {
	app.get('/', (c) => {
		return c.text('Welcome');
	});

	const routes = [auth];

	routes.map(route => route.register(app));
}



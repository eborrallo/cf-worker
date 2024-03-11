import { Next } from 'hono';
import { AuthContext } from './Web3AuthMiddleware';
import { Cache } from '../../../contexts/shared/domain/Cache';

export class CacheMiddleware {
	private EXPIRATION_IN_SECONDS = 300;

	constructor(private cache: Cache) {
	}

	async run(c: AuthContext, next: Next, ttl?: number) {
		const origin = c.req.url;
		const prev = await this.cache.get(origin);

		if (prev) return c.json(JSON.parse(prev));

		await next();

		if (c.res.status !== 200 && c.res.status !== 201) return;

		const response = c.res.clone();
		const json = await response.json();

		await this.cache.set(origin, JSON.stringify(json), ttl ?? this.EXPIRATION_IN_SECONDS);
	}
}

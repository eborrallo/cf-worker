import * as container from '../../../contexts/shared/infrastructure/di';
import { drizzle } from 'drizzle-orm/d1';
import { Config as AuthConfig } from '../../../contexts/auth/infrastructure/config';
import { Env } from '../types';
import { registerAuth } from './auth';
import { KvCache } from '../../../contexts/shared/infrastructure/cache/KvCache';
import { MessageController } from '../controllers/auth/MessageController';
import { CacheMiddleware } from '../middlewares/CacheMiddleware';
import { AuthContext } from '../middlewares/Web3AuthMiddleware';
import { Next } from 'hono';
import { registerShared } from './shared';

registerAuth(container);
registerShared(container);


let isRegisterDb = false;
export const registerDb = (env: Env) => {
	if (isRegisterDb) return;
	const db = drizzle(env.DB);
	container.register('ConnectionManager', () => db);
	isRegisterDb = true;
};

let isRegisterKv = false;
export const registerKv = (env: Env) => {
	if (isRegisterKv) return;
	const cache = new KvCache(env.KV);
	container.register('Cache', () => cache);

	isRegisterKv = true;
};

let isRegisterConfig = false;
export const registerConfig = (env: Env) => {
	if (isRegisterConfig) return;
	const authConfig = new AuthConfig();

	authConfig.load(env);

	container.register('AuthConfig', () => authConfig);
	isRegisterConfig = true;
};




export default container;

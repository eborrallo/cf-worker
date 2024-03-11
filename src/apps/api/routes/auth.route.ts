import { Hono } from 'hono';
import container from '../dependency-injection';
import { zValidator } from '@hono/zod-validator';
import { JwtGenerator } from '../../../contexts/auth/domain/services/JwtGenerator';

export const register = (router: Hono) => {
	const messageController = container.get('MessageController');
	const validateController = container.get('ValidateController');
	const cacheMiddleware = container.get('CacheMiddleware');

	router.get('/auth/:address/message',
		zValidator('param', messageController.params),
		messageController.run.bind(messageController));

	router.post('/auth/:address/validate',
		zValidator('param', validateController.params),
		zValidator('json', validateController.json),
		//(c, n) => cacheMiddleware(c, n, JwtGenerator.EXPIRE_TIME_IN_DAYS * 24 * 60 * 60),
		validateController.run.bind(validateController));
};

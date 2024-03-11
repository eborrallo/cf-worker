import { Context, Next } from 'hono';
import { JwtGenerator } from '../../../contexts/auth/domain/services/JwtGenerator';
import { UserRepository } from '../../../contexts/auth/domain/repositories/UserRepository';
import type { HonoRequest } from 'hono/dist/types/request';
import type { Env } from 'hono/dist/types/types';


interface AuthRequest extends HonoRequest {
	user?: any;
}

export interface AuthContext extends Context<Env, any, any> {
	req: AuthRequest;
}

export class Web3AuthMiddleware {

	constructor(private jwtGenerator: JwtGenerator, private userRepository: UserRepository) {
	}

	async run(c: AuthContext, next: Next) {
		try {
			if (c.req.header('Authorization')?.startsWith('Bearer ')) {
				const token = c.req.header('Authorization')!.substring(7, c.req.header('Authorization')!.length);
				const { payload }: any = await this.jwtGenerator.verify(token);
				const user = await this.userRepository.searchByAddress(payload.address);
				if (user) {
					c.req.user = user.toPrimitives();
					await next();
				} else {
					return	c.newResponse(`Invalid auth: ${c.req.header('authorization')}`, 401);

				}
			} else {
				return	c.newResponse(`Invalid auth: ${c.req.header('authorization')}`, 401);
				;
			}
		} catch (e) {
			return c.newResponse(`Invalid auth: ${c.req.header('authorization')}`, 401);

		}

	}
}

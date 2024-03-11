import { UserRepository } from '../../domain/repositories/UserRepository';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import { users } from './drizzle/schemas';
import { User } from '../../domain/models/User';
import { eq } from 'drizzle-orm';
import * as container from '../../../shared/infrastructure/di';

export class DrizzleUserRepository implements UserRepository {

	constructor() {
	}

	async save(user: User): Promise<void> {
		const conn=container.get('ConnectionManager') as DrizzleD1Database
		const userPrimitive = user.toPrimitives();
		await conn.insert(users).values(userPrimitive).onConflictDoUpdate({
			target: users.id,
			set: { token: userPrimitive.token }
		});

		return;
	}

	async searchByAddress(address: string): Promise<User | null> {
		const conn=container.get('ConnectionManager') as DrizzleD1Database

		const user = await conn.select().from(users).where(eq(users.address, address)).get();
		if (!user) return null;

		return User.fromPrimitives(user as any);

	}

	async searchByToken(token: string): Promise<User | null> {
		const conn=container.get('ConnectionManager') as DrizzleD1Database

		const user = await conn.select().from(users).where(eq(users.token, token)).get();
		if (!user) return null;

		return User.fromPrimitives(user as any);
	}


}

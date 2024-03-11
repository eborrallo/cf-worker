import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('user', {
		id: integer('id').primaryKey(),
		address: text('name'),
		email: text('email'),
		token: text('token').notNull()
	}, (user) => ({
		addressIdx: uniqueIndex('addressIdx').on(user.address)
	})
);

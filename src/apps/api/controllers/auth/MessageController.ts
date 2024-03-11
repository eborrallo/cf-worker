import { Context } from 'hono';
import { MessageGenerator } from '../../../../contexts/auth/domain/services/MessageGenerator';
import { z } from 'zod';
import { QueryBus } from '../../../../contexts/shared/domain/cqrs/QueryBus';
import { GetMessageQuery } from '../../../../contexts/auth/application/queries/GetMessage/GetMessageQuery';

export class MessageController {
	constructor(private queryBus: QueryBus) {
	}

	public params = z.object({
		address: z.string().regex(new RegExp(/^0x[0-9A-Fa-f]{40}$/))
	});

	async run(c: Context) {
		const { hostname } = new URL(c.req.url);

		const publicAddress: string = c.req.param('address');
		const message = await this.queryBus.ask(new GetMessageQuery(publicAddress, hostname));

		return c.json({ message });
	}
}

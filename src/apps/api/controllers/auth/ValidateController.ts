import { Context } from 'hono';
import { z } from 'zod';
import { oneOf } from '../../middlewares/helpers';
import { JwtGenerator } from '../../../../contexts/auth/domain/services/JwtGenerator';
import { fromChainId, SupportedNetworks } from '../../../../contexts/shared/domain/blokchain/Network';
import { CommandBus } from '../../../../contexts/shared/domain/cqrs/CommandBus';
import { MessageVerificator } from '../../../../contexts/auth/application/services/MessageVerificator';
import {
	UpsetTokenUserCommand
} from '../../../../contexts/auth/application/commands/UpsetTokenUser/UpsetTokenUserCommand';

export class ValidateController {
	constructor(private commandBus: CommandBus, private jwtGenerator: JwtGenerator, private messageVerificator: MessageVerificator) {
	}

	public json = z.object({
		signature: z.string(),
		chainId: oneOf([...SupportedNetworks] as const)
	});

	public params = z.object({
		address: z.string().regex(new RegExp(/^0x[0-9A-Fa-f]{40}$/))
	});

	async run(c: Context) {
		const { signature, chainId } = await c.req.json();
		const publicAddress: string = c.req.param('address');
		try {
			await this.messageVerificator.verify({
				signature,
				ethereumAddress: publicAddress,
				network: fromChainId(chainId)!
			});
		} catch (e: any) {
			return c.json({ error: e.message }, 400);
		}
		const token = await this.jwtGenerator.generate(publicAddress);

		await this.commandBus.dispatch(new UpsetTokenUserCommand(token, publicAddress));

		return c.json({ token });
	}
}

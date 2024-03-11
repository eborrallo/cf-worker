import { SignatureVerificator } from '../../domain/SignatureVerificator';
import { Network } from '../../../shared/domain/blokchain/Network';
import { MessageGenerator } from '../../domain/services/MessageGenerator';

export class MessageVerificator {
	constructor(private verficator: SignatureVerificator, private messageGenerator: MessageGenerator) {
	}


	async verify(payload: { signature: any, ethereumAddress: string, network: Network }): Promise<void> {
		const message = await this.messageGenerator.get(payload.ethereumAddress);
		if (!message) throw new Error('Message expired');

		await this.verficator.verifyMessage(message, payload.signature, payload.ethereumAddress, payload.network);
	}
}

import { Cache } from '../../../shared/domain/Cache';

export class MessageGenerator {
	private KEY = 'auth_message_';


	constructor(private crypto: { randomUUID: () => string }, private date: {
		toISOString: () => string
	}, private cache: Cache) {
	}

	private key(address: string) {
		return `${this.KEY}${address.toLowerCase()}`;
	}

	async get(address: string) {
		return this.cache.get(this.key(address));
	}

	async generate(ethereumAddress: string, origin?: any | null) {
		const prev = await this.get(ethereumAddress);

		if (prev) return prev;
		const response = `${
			origin || 'unknown'
		} wants you to sign in with your Ethereum account: ${ethereumAddress} Sign in with ethereum to URI: ${
			origin || 'unknown'
		} Version: 1 Nonce: ${this.crypto.randomUUID()} Issued At: ${this.date.toISOString()}`;
		await this.cache.set(this.key(ethereumAddress), response);
		return response;
	}
}

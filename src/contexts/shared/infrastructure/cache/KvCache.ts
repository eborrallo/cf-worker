import { Cache } from '../../domain/Cache';

export class KvCache implements Cache {
	private EXPIRATION_IN_SECONDS = 300;
	constructor(private kv: KVNamespace) {
	}

	async get(key: string) {
		return this.kv.get(key);
	}

	async set(key: string, value: string, ttl?: number) {
		return this.kv.put(key, value, { expirationTtl: ttl??this.EXPIRATION_IN_SECONDS });
	}
}

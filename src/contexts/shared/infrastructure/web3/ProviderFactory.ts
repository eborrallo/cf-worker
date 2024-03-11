import { JsonRpcProvider } from 'ethers';
import { Network } from '../../domain/blokchain/Network';
import { ConfigBase } from '../ConfigBase';

export class ProviderFactory {
	constructor(private config: ConfigBase) {
	}

	from(network: Network): JsonRpcProvider {
		return new JsonRpcProvider(
			`https://eth-${network}.g.alchemy.com/v2/${this.config.get('alchemyApiKey')}`
		);
	}
}

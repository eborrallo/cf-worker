import { ethers } from 'ethers';
import { Network } from '../../shared/domain/blokchain/Network';
import { ProviderFactory } from '../../shared/infrastructure/web3/ProviderFactory';

export class SignatureVerificator {
	private eip1271ABI = [
		'function isValidSignature(bytes _message, bytes _signature) public view returns (bytes4 magicValue)'
	];
	private eip1271MagicLink = ethers.id('isValidSignature(bytes,bytes)');
	private EMPTY_BYTE = '0x';

	constructor(private providerFactory: ProviderFactory) {
	}

	async verifyMessage(message: string, signature: any, ethereumAddress: string, network: Network) {
		const provider = this.providerFactory.from(network);
		const code = await provider.getCode(ethereumAddress);
		let valid;
		if (code === this.EMPTY_BYTE) {
			// normal wallet
			const signedAddress = ethers.verifyMessage(message, signature);
			valid = signedAddress.toLowerCase() === ethereumAddress.toLowerCase();
		} else {
			// smart contract wallet
			const contractWallet = new ethers.Contract(ethereumAddress, this.eip1271ABI, provider);
			const hashMessage = ethers.hashMessage(message);

			try {
				const returnValue = await contractWallet.isValidSignature(hashMessage, signature);
				valid = this.eip1271MagicLink.startsWith(returnValue);
			} catch (error) {
				// signature is not valid
				valid = false;
			}
		}
		if (!valid) {
			throw Error('Signature not valid');
		}
	}
}

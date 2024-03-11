import { MessageController } from '../controllers/auth/MessageController';
import { ValidateController } from '../controllers/auth/ValidateController';
import { SignatureVerificator } from '../../../contexts/auth/domain/SignatureVerificator';
import { JwtGenerator } from '../../../contexts/auth/domain/services/JwtGenerator';
import { Web3AuthMiddleware } from '../middlewares/Web3AuthMiddleware';
import { DrizzleUserRepository } from '../../../contexts/auth/infrastructure/persistence/DrizzleUserRepository';
import jwt from '@tsndr/cloudflare-worker-jwt';
import { MessageGenerator } from '../../../contexts/auth/domain/services/MessageGenerator';
import { ProviderFactory } from '../../../contexts/shared/infrastructure/web3/ProviderFactory';
import { ConfigBase } from '../../../contexts/shared/infrastructure/ConfigBase';
import { GetMessageQueryHandler } from '../../../contexts/auth/application/queries/GetMessage/GetMessageQueryHandler';
import { MessageVerificator } from '../../../contexts/auth/application/services/MessageVerificator';
import {
	UpsetTokenUserCommandHandler
} from '../../../contexts/auth/application/commands/UpsetTokenUser/UpsetTokenUserCommandHandler';


export const registerAuth = (container: any) => {

	const cacheWrapper ={
		get: (key: string) => container.get('Cache').get(key),
		set: (key: string, value: string, ttl?: number) => container.get('Cache').set(key, value, ttl)
	};
	container.register('MessageController', () => new MessageController(container.get('QueryBus')));
	container.register('ValidateController', () => new ValidateController(
		container.get('CommandBus'),
		container.get('JwtGenerator'),
		container.get('MessageVerificator')
	));
	container.register('MessageVerificator', () => new MessageVerificator(container.get('SignatureVerificator'), container.get('MessageGenerator')));
	container.register('JwtGenerator', () => new JwtGenerator(jwt, { get: (key: string) => container.get('AuthConfig').get(key) } as ConfigBase));
	container.register('SignatureVerificator', () => new SignatureVerificator(container.get('ProviderFactory')));

	container.register('UserRepository', () => new DrizzleUserRepository());
	container.register('Web3AuthMiddleware', () => new Web3AuthMiddleware(container.get('JwtGenerator'), container.get('UserRepository')));

	container.register('MessageGenerator', () => new MessageGenerator(
		crypto,
		{ toISOString: () => new Date().toISOString() },
		cacheWrapper
	));
	container.registerTransient('ProviderFactory', () => new ProviderFactory({ get: (key: string) => container.get('AuthConfig').get(key) } as ConfigBase));

	container.register('GetMessageQueryHandler (queryHandler)', () => new GetMessageQueryHandler(container.get('MessageGenerator')));
	container.register('UpsetTokenUserCommandHandler (commandHandler)', () => new UpsetTokenUserCommandHandler(container.get('UserRepository')));
};

import * as container from '../../../contexts/shared/infrastructure/di';
import { AuthContext } from '../middlewares/Web3AuthMiddleware';
import { Next } from 'hono';
import { CacheMiddleware } from '../middlewares/CacheMiddleware';
import { InMemoryCommandBus } from '../../../contexts/shared/infrastructure/commandBus/InMemoryCommandBus';
import { InMemoryQueryBus } from '../../../contexts/shared/infrastructure/queryBus/InMemoryQueryBus';
import {
	CommandHandlersInformation
} from '../../../contexts/shared/infrastructure/commandBus/CommandHandlersInformation';
import { QueryHandlersInformation } from '../../../contexts/shared/infrastructure/queryBus/QueryHandlersInformation';

export const registerShared = (container: any) => {

	container.register('CacheMiddleware', () => (c: AuthContext, next: Next) => {
		const mdl = new CacheMiddleware(container.get('Cache'));
		return mdl.run(c, next);
	});

	container.register('CommandHandlersInformation', () => new CommandHandlersInformation(Object.values(container.getByTag('commandHandler'))));
	container.register('CommandBus', () => new InMemoryCommandBus(container.get('CommandHandlersInformation')));
	container.register('QueryHandlersInformation', () => new QueryHandlersInformation(Object.values(container.getByTag('queryHandler'))));
	container.register('QueryBus', () => new InMemoryQueryBus(container.get('QueryHandlersInformation')));


};

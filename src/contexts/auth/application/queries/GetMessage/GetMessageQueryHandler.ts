import { QueryHandler } from '../../../../shared/domain/cqrs/QueryHandler';
import { GetMessageQuery } from './GetMessageQuery';
import { Query } from '../../../../shared/domain/cqrs/Query';
import { MessageGenerator } from '../../../domain/services/MessageGenerator';

export class GetMessageQueryHandler implements QueryHandler<GetMessageQuery, any | null> {
	constructor(private messageGenerator: MessageGenerator) {
	}

	subscribedTo(): Query {
		return GetMessageQuery;
	}

	async handle(command: GetMessageQuery): Promise<string> {
		return this.messageGenerator.generate(command.address, command.origin);
	}
}

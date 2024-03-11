import { Query } from '../../../../shared/domain/cqrs/Query';

export class GetMessageQuery extends Query {
	constructor(readonly address:string , readonly origin:string) {
		super()
	}
}

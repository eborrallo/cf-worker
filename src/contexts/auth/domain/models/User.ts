import { AggregateRoot } from '../../../shared/domain/value-object/AggregateRoot';

export class User extends AggregateRoot {

	constructor(public token?: string, readonly address?: string, readonly email?: string, public id?: string) {
		super();
	}

	changeToken(token: string) {
		this.token = token;
	}

	static fromPrimitives(plainData: Partial<User>): User {
		return new User(plainData.token!, plainData.address, plainData.email, plainData.id);
	}

	toPrimitives(): any {
		return {
			id: this.id,
			address: this.address,
			email: this.email,
			token: this.token
		};
	}
}

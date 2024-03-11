import moment from 'moment';
import { ConfigBase } from '../../../shared/infrastructure/ConfigBase';

export class JwtGenerator {
	static EXPIRE_TIME_IN_DAYS = 1;
	constructor(private jwt: {
		sign: (payload: any, secret: string) => Promise<string>,
		verify: (token: string, secret: string) => Promise<any>,
		decode: (token: string) => any
	}, private config:ConfigBase) {

	}

	async generate(text: string) {
		return this.jwt.sign({
			address: text,
			exp: moment().add(JwtGenerator.EXPIRE_TIME_IN_DAYS, 'day').unix()
		}, this.config.get('jwtSecret'));
	}

	async verify(token: string) {

		if (await this.jwt.verify(token, this.config.get('jwtSecret'))) {
			return this.jwt.decode(token);
		}
		throw new Error('Invalid token');
	}
}

import { ConfigBase } from '../../../shared/infrastructure/ConfigBase';
import { Env } from '../../../../apps/api/types';

export class Config extends ConfigBase {


	load(env: Env) {
		this.data = {
			jwtSecret: env.JWT_SECRET || '123123',
			alchemyApiKey: env.ALCHEMY_API_KEY || 'edw8VE0fhhMcRnfAwp1cYANd8SL3_VdD',
		};

		super.getters();
	}
}

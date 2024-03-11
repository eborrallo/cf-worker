export abstract class ConfigBase {
	protected data: any;

	[key: string]: any;

	get(key: string) {
		return this.data[key];

	}

	protected getters() {
		for (let key in this.data) {
			Object.defineProperty(this, key, {
				get: () => {
					return this.data[key];
				}
			});
		}
	}
}

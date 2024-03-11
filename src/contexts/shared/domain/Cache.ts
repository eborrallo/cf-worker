export interface Cache {
	get(key: string): Promise<string | null>;

	set(key: string, value: string, ttl?: number): Promise<void>;
}

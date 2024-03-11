import { Server } from './server';

export class ApiApp{

	private server?: Server;

	 start(){
		this.server = new Server();
		return this.server.listen();
	}

	get httpServer(){
		return this.server!.app;
	}
}

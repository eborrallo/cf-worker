import { UpsetTokenUserCommand } from './UpsetTokenUserCommand';
import { Command } from '../../../../shared/domain/cqrs/Command';
import { CommandHandler } from '../../../../shared/domain/cqrs/CommandHandler';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { User } from '../../../domain/models/User';

export class UpsetTokenUserCommandHandler implements CommandHandler<UpsetTokenUserCommand> {
	constructor(private userRepository: UserRepository) {
	}

	subscribedTo(): Command {
		return UpsetTokenUserCommand;
	}

	async handle(command: UpsetTokenUserCommand): Promise<void> {
		let user = await this.userRepository.searchByAddress(command.ethereumAddress);

		if (!user) {
			user = new User(command.token, command.ethereumAddress.toLowerCase());
		} else {
			user.changeToken(command.token);
		}
		await this.userRepository.save(user);
	}
}

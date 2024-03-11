import { Command } from '../../../../shared/domain/cqrs/Command';
import { Network } from '../../../../shared/domain/blokchain/Network';

export class UpsetTokenUserCommand extends Command {
  constructor(readonly token:string, readonly ethereumAddress: string) {
    super()
  }
}

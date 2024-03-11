import { Command } from '../../domain/cqrs/Command'
import { CommandBus } from '../../domain/cqrs/CommandBus'
import { CommandHandlersInformation } from './CommandHandlersInformation'

export class InMemoryCommandBus implements CommandBus {
  private commandHandlersInformation: CommandHandlersInformation

  constructor(commandHandlersInformation: CommandHandlersInformation) {
    this.commandHandlersInformation = commandHandlersInformation
  }

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlersInformation.search(command)

    await handler.handle(command)
  }
}

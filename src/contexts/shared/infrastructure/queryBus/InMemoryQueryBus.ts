import { Query } from '../../domain/cqrs/Query'
import { Response } from '../../domain/cqrs/Response'
import { QueryBus } from '../../domain/cqrs/QueryBus'
import { QueryHandlersInformation } from './QueryHandlersInformation';

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlersInformation) {}

  async ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query)

    return handler.handle(query) as Promise<R>
  }
}

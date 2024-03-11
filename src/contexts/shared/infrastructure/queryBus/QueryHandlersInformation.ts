import { Query } from '../../domain/cqrs/Query'
import { QueryHandler } from '../../domain/cqrs/QueryHandler'
import { QueryNotRegisteredError } from '../../domain/cqrs/QueryNotRegisteredError'
import { Response } from '../../domain/cqrs/Response'

export class QueryHandlersInformation {
  private queryHandlersMap: Map<Query, QueryHandler<Query, Response>>

  constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers)
  }

  private formatHandlers(
    queryHandlers: Array<QueryHandler<Query, Response>>
  ): Map<Query, QueryHandler<Query, Response>> {
    const handlersMap = new Map()

    queryHandlers.forEach(queryHandler => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler)
    })

    return handlersMap
  }

  public search(query: Query): QueryHandler<Query, Response> {
    const queryHandler = this.queryHandlersMap.get(query.constructor)

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query)
    }

    return queryHandler
  }
}

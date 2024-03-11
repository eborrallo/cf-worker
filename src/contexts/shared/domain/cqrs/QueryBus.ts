import { Query } from './Query'
import { Response } from './Response'
import { ResponsePaginated } from '../ResponsePaginated'

export interface QueryBus {
  ask<R extends Response | ResponsePaginated<any>>(query: Query): Promise<R>
}

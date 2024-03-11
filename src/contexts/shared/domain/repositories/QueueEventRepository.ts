import { QueueEvent } from '../../infrastructure/typeorm/entities/queue-event'

export interface QueueEventRepository {
  save(entity: QueueEvent): Promise<QueueEvent>
  delete(where: object): Promise<void>
  search(where: object): Promise<QueueEvent | null>
  all(where: object): Promise<QueueEvent[] | null>
}

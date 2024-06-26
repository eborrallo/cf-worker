import { DomainEventMapping } from '../../infrastructure/EventBus/DomainEventMapping'
import { DomainEvent } from '../events/DomainEvent'
import { DomainEventSubscriber } from '../events/DomainEventSubscriber'

export interface EventBus {
  setDomainEventMapping(domainEventMapping: DomainEventMapping): void
  publish(events: Array<DomainEvent>): Promise<void>
  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void
  start(): Promise<void>
}

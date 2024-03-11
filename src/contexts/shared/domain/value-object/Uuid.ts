import { InvalidArgumentError } from './InvalidArgumentError'
import { UuidV4Generator } from '../../infrastructure/Generators/UuidV4Generator'
import { UuidGenerator } from '../services/UuidGenerator'
import { ValueObject } from './ValueObject'

export class Uuid extends ValueObject<string> {
  private uuidGenerator: UuidGenerator
  constructor(value: string) {
    super(value)
    this.uuidGenerator = new UuidV4Generator()
    this.ensureIsValidUuid(value)
  }

  static random(): Uuid {
    return new Uuid(new UuidV4Generator().random())
  }

  private ensureIsValidUuid(id: string): void {
    id = typeof id === 'object' ? id!['value'] : id
    if (!this.uuidGenerator.validate(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`)
    }
  }

  toString(): string {
    return this.value.toString()
  }
}

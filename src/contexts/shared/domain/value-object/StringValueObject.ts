import { ValueObject } from './ValueObject'

export abstract class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value)
  }

  toString(): string {
    return this.value.toString()
  }
}

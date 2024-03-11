import { ValueObject } from './ValueObject'
export abstract class NumberValueObject extends ValueObject<number> {
  readonly value: number

  constructor(value: number) {
    super(value)
    this.value = value
  }

  equalsTo(other: NumberValueObject): boolean {
    return this.value === other.value
  }

  isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value
  }
}

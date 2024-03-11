type Primitives = string | string | number | boolean | boolean | Date | string[]

export abstract class ValueObject<T extends Primitives> {
  readonly value: T

  constructor(value: T) {
    this.value = value
  }

  public equals(o: ValueObject<T>): boolean {
    return this.value === o.value
  }

  toJSON() {
    return this.toString()
  }

  toString() {
    if (this.value) {
      return this.value.toString()
    }

    return this.value
  }

  valueOf() {
    return this.value
  }
}

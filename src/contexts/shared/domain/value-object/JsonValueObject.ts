import { ValueObject } from './ValueObject'
type GenericObject = { [key: string]: any }

export class JsonValueObject extends ValueObject<any> {
  constructor(value: GenericObject) {
    super(value)
  }

  toString() {
    this.value.toString()
  }
}

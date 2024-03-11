export interface UuidGenerator {
  random(): string
  validate(uuid: string): boolean
}

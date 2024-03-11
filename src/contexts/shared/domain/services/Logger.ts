export default interface Logger {
  debug(message: string, ...meta: any): void
  error(message: string | Error): void
  info(message: string, ...meta: any): void
  http(message: string, ...meta: any): void
  warn(message: string, ...meta: any): void
}

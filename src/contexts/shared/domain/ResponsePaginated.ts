export interface ResponsePaginated<Q> {
  items: Array<Q>
  pagination: {
    offset: number
    limit: number
    total?: number
  }
}

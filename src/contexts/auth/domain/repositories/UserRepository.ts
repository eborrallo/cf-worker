import { User } from '../models/User'

export interface UserRepository {
  save(entity: User): Promise<void>
  searchByToken(token: string): Promise<User | null>
  searchByAddress(address: string): Promise<User | null>
}

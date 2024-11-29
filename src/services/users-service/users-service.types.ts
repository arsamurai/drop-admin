import { UserSchema } from "./users-service.validation"

// RESPONSES
export type UsersResponse = UsersWithPagination
export type UserResponse = { data: UserEntity }
export type RelationsResponse = { data: Relations }

// PARAMS
export type UsersParams = {
  query?: string
  pageSize?: string
  page?: string
  sort?: string
  order?: string
}

export type CreateUserParams = UserSchema
export type EditUserParams = UserSchema & { id: number }

type UsersWithPagination = {
  data: UserEntity[]
  pagination: {
    page: number
    perPage: number
    total: number[]
  }
}

export type UserEntity = {
  createdAt: string
  email: string
  fullName: string
  id: number
  isVerifiedEmail: boolean
  phone: string
  roles: string[]
  saleChannels: SaleChannel[]
  tg_username: string
  updatedAt: string
  uuid: string
  weeklySales: string
}

type Relations = {
  saleChannels: SaleChannel[]
  userRoles: string[]
  weeklySales: WeeklySales[]
}

interface SaleChannel {
  id: number
  name: string
}

interface WeeklySales {
  [key: string]: string
}

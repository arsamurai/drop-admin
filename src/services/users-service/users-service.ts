import { privateApi } from "@services/api"

import {
  CreateUserParams,
  EditUserParams,
  RelationsResponse,
  UserResponse,
  UsersParams,
  UsersResponse,
} from "./users-service.types"

export class UsersService {
  static getUsers = (params?: UsersParams) => {
    const query = new URLSearchParams(params)
    return privateApi.get<UsersResponse>(`users/${query ? "?" + query : ""}`)
  }

  static getUser = (id: number) => {
    return privateApi.get<UserResponse>(`user/${id}`)
  }

  static getRelations = () => {
    return privateApi.get<RelationsResponse>("users/relations")
  }

  static createUser = (params: CreateUserParams) => {
    return privateApi.post<UserResponse>("user/create", params)
  }

  static editUser = (params: EditUserParams) => {
    return privateApi.post<UserResponse>(`user/${params.id}/update`, params)
  }

  static removeUser = (id: number) => {
    return privateApi.post<{ data: [] }>(`user/${id}/delete`)
  }
}

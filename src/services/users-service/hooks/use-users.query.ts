import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { useDebounce } from "@shared/hooks"

import { UsersService } from "../users-service"
import { UsersParams } from "../users-service.types"

export const usersQueryCacheKey = "users"

export const useUsersQuery = (params?: UsersParams) => {
  const searchQuery = useDebounce(params?.query, 200)

  const filters = {
    ...params,
    query: searchQuery ?? "",
  }

  return useQuery({
    queryKey: [usersQueryCacheKey, filters],
    queryFn: () => UsersService.getUsers(filters),
    placeholderData: keepPreviousData,
    select: response => {
      return response.data
    },
  })
}

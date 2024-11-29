import { useQuery } from "@tanstack/react-query"

import { UsersService } from "../users-service"
import { UserEntity } from "../users-service.types"

export const useUserQuery = (id: number, stagedUser?: UserEntity) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => UsersService.getUser(id),
    initialData: () => {
      if (!stagedUser) {
        return undefined
      }

      return { data: { data: stagedUser } }
    },
    select: response => {
      return response.data.data
    },
    enabled: !!id && !stagedUser,
  })
}

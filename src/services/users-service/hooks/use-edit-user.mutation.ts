import { useMutation, useQueryClient } from "@tanstack/react-query"

import { UsersService } from "../users-service"
import { userQueryCacheKey } from "./use-user.query"
import { usersQueryCacheKey } from "./use-users.query"

export const useEditUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: UsersService.editUser,
    onSuccess: async response => {
      queryClient.setQueryData([userQueryCacheKey, response.data.data.id], response)
      await queryClient.invalidateQueries({
        queryKey: [usersQueryCacheKey],
      })
    },
  })
}

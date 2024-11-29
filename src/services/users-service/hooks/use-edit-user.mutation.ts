import { useMutation, useQueryClient } from "@tanstack/react-query"

import { UsersService } from "../users-service"
import { usersQueryCacheKey } from "./use-users.query"

export const useEditUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: UsersService.editUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [usersQueryCacheKey],
      })
    },
  })
}

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { UsersService } from "../users-service"
import { usersQueryCacheKey } from "./use-users.query"

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: UsersService.createUser,
    onSuccess: async () => {
      showToast("Користувача створено", { type: "success" })
      await queryClient.invalidateQueries({
        queryKey: [usersQueryCacheKey],
      })
    },
  })
}

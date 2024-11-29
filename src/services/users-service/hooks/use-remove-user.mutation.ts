import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { UsersService } from "../users-service"
import { usersQueryCacheKey } from "./use-users.query"

export const useRemoveUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: UsersService.removeUser,
    onSuccess: async () => {
      showToast("Користувача видалено", { type: "success" })
      await queryClient.invalidateQueries({
        queryKey: [usersQueryCacheKey],
      })
    },
  })
}

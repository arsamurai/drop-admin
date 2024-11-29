import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"
import { isAxiosError } from "@shared/utils/error-handler"

import { AuthService } from "../auth-service"

interface LoginMutationOptions {
  searchParams: URLSearchParams
  saveRefresh?: boolean
}

export const useLoginMutation = ({ searchParams, saveRefresh = true }: LoginMutationOptions) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: ({ data }) => {
      AuthService.setTokens({
        token: data.token,
        ...(saveRefresh ? { refreshToken: data.refreshToken } : {}),
      })

      navigate(searchParams.get("redirect") ?? ROUTES.ROOT.path, {
        replace: true,
      })
    },
    onError: e => {
      if (isAxiosError(e) && e.response?.status === 401) {
        showToast(e.response.data.message, {
          type: "error",
        })
      }
    },
  })
}

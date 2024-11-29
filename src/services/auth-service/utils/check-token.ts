import { AuthService } from "../auth-service"

export const checkToken = async () => {
  const token = AuthService.getAccessToken

  if (token) {
    return true
  }

  if (!token) {
    try {
      const response = await AuthService.refreshTokens()
      AuthService.setTokens(response.data)
      return true
    } catch {
      AuthService.logout(window.location.pathname)
    }
  }
}

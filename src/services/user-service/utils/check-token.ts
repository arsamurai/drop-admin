import { UserService } from "../user-service"

export const checkToken = async () => {
  const token = UserService.getAccessToken

  if (token) {
    return true
  }

  if (!token) {
    try {
      const response = await UserService.refreshTokens()
      UserService.setTokens(response.data)
      return true
    } catch {
      UserService.logout(window.location.pathname)
    }
  }
}

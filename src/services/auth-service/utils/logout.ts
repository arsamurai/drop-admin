import { AuthService } from "../auth-service"

export const logout = () => {
  AuthService.logout()
}

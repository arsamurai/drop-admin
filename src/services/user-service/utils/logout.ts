import { UserService } from "../user-service"

export const logout = () => {
  UserService.logout()
}

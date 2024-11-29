import { FC } from "react"

import { UserEntity, useEditUserMutation } from "@services/users-service"

import { useBoolean } from "@shared/hooks"
import { Switch } from "@shared/ui/fields"
import { showToast } from "@shared/ui/toastify"
import { isAxiosError } from "@shared/utils/error-handler"

const UserVerified: FC<{ user: UserEntity }> = ({ user }) => {
  const editUser = useEditUserMutation()
  const [isVerifiedEmail, setIsVerifiedEmail] = useBoolean(user.isVerifiedEmail)

  const changeVerified = async (user: UserEntity) => {
    setIsVerifiedEmail.toggle()
    try {
      await editUser.mutateAsync({
        ...user,
        isVerifiedEmail: !user.isVerifiedEmail,
        saleChannels: user?.saleChannels.map(item => item.id.toString()),
      })
      showToast(`Користувача ${!user.isVerifiedEmail ? "варифіковано" : "деварифіковано"}`, {
        type: "success",
      })
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        showToast(e.response?.data?.message, { type: "error" })
      }
      setIsVerifiedEmail.toggle()
    }
  }
  return (
    <Switch>
      <Switch.Input
        id={`is-verified-user-${user.id}`}
        type="checkbox"
        checked={isVerifiedEmail}
        onChange={() => changeVerified(user)}
      />
    </Switch>
  )
}
export default UserVerified

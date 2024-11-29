import { FC } from "react"
import { Link } from "react-router-dom"

import { UserEntity, useRemoveUserMutation } from "@services/users-service"

import { ROUTES } from "@shared/constants"
import { useBoolean } from "@shared/hooks"
import { Button } from "@shared/ui/button"
import { AlertDialog } from "@shared/ui/dialogs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown"

const UsersOptions: FC<{ user: UserEntity }> = ({ user }) => {
  const [removeUserAlert, setRemoveUserAlert] = useBoolean(false)
  const removeUser = useRemoveUserMutation()

  const handleRemoveUser = (id: number) => {
    removeUser.mutate(id)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>...</DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-0">
          <DropdownMenuItem className="flex gap-2">
            <Button variant="primary" size="sm" asChild>
              <Link to={`${ROUTES.EDIT_USER.path}/${user.id}`} state={{ user }}>
                Edit
              </Link>
            </Button>
            <Button variant="danger" size="sm" onClick={setRemoveUserAlert.on}>
              Remove
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={removeUserAlert}
        handleOk={() => handleRemoveUser(user.id)}
        handleClose={setRemoveUserAlert.off}
        text="Ви впевнені, що хочете видалити користувача?"
      />
    </>
  )
}
export default UsersOptions

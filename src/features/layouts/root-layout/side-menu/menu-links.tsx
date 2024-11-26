import { ROUTES } from "@shared/constants"

import UserIcon from "@assets/icons/user.svg"

import { Menu } from "./menu.types"

export const menuLinks: Array<Menu | string> = [
  "Списки",
  {
    icon: <UserIcon />,
    pathname: ROUTES.USERS.path,
    title: "Користувачі",
  },
]

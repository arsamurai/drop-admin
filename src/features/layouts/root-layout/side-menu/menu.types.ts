import { ReactNode } from "react"

export interface MenuLocation {
  pathname: string
  search: string
  forceActiveMenu?: string
}

export interface Menu {
  icon: ReactNode
  title: string
  pathname?: string
  subMenu?: Menu[]
}

export interface FormattedMenu extends Menu {
  active?: boolean
  activeDropdown?: boolean
  subMenu?: FormattedMenu[]
}

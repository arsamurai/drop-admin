import { ReactNode } from "react"

import { ButtonProps } from "@shared/ui/button"

export interface SheetProps {
  open: boolean
  handleClose: () => void
  title: string
  children: ReactNode
  okOptions?: ButtonProps
  cancelOptions?: ButtonProps
}

import { ReactNode } from "react"

import { ButtonProps } from "@shared/ui/button"

export interface DialogProps {
  open: boolean
  handleClose: () => void
  title: string
  children: ReactNode
  okOptions?: ButtonProps
  cancelOptions?: ButtonProps
}

export interface AlertDialogProps {
  open: boolean
  handleOk: () => void
  handleClose: () => void
  text: string
}

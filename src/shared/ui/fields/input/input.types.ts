import { ReactNode } from "react"

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  formInputSize?: "sm" | "lg"
  rounded?: boolean
  helpText?: string
  error?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export type InputRef = React.ComponentPropsWithRef<"input">["ref"]

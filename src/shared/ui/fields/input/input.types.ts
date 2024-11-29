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

export interface InputWithMaskProps extends Omit<InputProps, "value" | "onChange"> {
  value?: string
  onChange?: (value: string) => void
}

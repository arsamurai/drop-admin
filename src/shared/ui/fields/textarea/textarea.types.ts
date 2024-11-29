export interface TextareaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  formTextareaSize?: "sm" | "lg"
  rounded?: boolean
}

export type TextareaRef = React.ComponentPropsWithRef<"textarea">["ref"]

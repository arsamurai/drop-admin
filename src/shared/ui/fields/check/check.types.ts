export type CheckProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"div">

export type CheckLabelProps = React.PropsWithChildren & React.ComponentPropsWithoutRef<"label">

export interface CheckInputProps extends React.ComponentPropsWithoutRef<"input"> {
  type: "radio" | "checkbox"
}

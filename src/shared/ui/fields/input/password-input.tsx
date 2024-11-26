import { forwardRef, useState } from "react"

import EyeClose from "@assets/icons/eye-close.svg"
import EyeOpen from "@assets/icons/eye-open.svg"

import Input from "./input"
import { InputProps } from "./input.types"

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  const [type, setType] = useState<"text" | "password">("password")

  const handleSetType = () => {
    setType(prevType => (prevType === "password" ? "text" : "password"))
  }

  return (
    <Input
      ref={ref}
      type={type}
      placeholder="************"
      endIcon={
        <span className="cursor-pointer" onClick={handleSetType}>
          {type === "password" ? <EyeClose /> : <EyeOpen />}
        </span>
      }
      {...props}
    />
  )
})
PasswordInput.displayName = "PasswordInput"

export default PasswordInput

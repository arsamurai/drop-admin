import { forwardRef } from "react"

import { InputWithMaskProps } from "./input.types"
import MaskInput from "./mask-input"

const PhoneInput = forwardRef<HTMLInputElement, InputWithMaskProps>(
  ({ onChange, ...props }, ref) => {
    return (
      <MaskInput
        inputRef={ref}
        unmask
        overwrite
        lazy
        mask="+{380} 00 000 00 00"
        placeholder="+380 96 111 22 33"
        onAccept={onChange}
        {...props}
      />
    )
  },
)

PhoneInput.displayName = "PhoneInput"

export default PhoneInput

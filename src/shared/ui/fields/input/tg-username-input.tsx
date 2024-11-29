import { forwardRef } from "react"

import { InputWithMaskProps } from "./input.types"
import MaskInput from "./mask-input"

const TgUsernameInput = forwardRef<HTMLInputElement, InputWithMaskProps>(
  ({ onChange, ...props }, ref) => {
    return (
      <MaskInput
        inputRef={ref}
        label="Логін в Telegram *"
        placeholder="@tg_username"
        unmask
        mask={`@${Array(32).fill("").join("#")}`}
        onAccept={onChange}
        definitions={{
          "#": {
            mask: /^[a-zA-Z0-9_]$/,
          },
        }}
        {...props}
      />
    )
  },
)

TgUsernameInput.displayName = "TgUsernameInput"

export default TgUsernameInput

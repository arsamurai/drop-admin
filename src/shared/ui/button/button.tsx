import { Slot, Slottable } from "@radix-ui/react-slot"
import React from "react"

import { cn } from "@shared/utils/cn"

import { ButtonProps } from "./button.types"
import { buttonVariants } from "./button.variants"

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      asChild = false,
      startIcon,
      endIcon,
      elevated,
      rounded,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          "shadow-md": elevated,
          "rounded-full": rounded,
        })}
        ref={ref}
        {...props}
      >
        {startIcon && <span className="mr-2">{startIcon}</span>}
        <Slottable>{children}</Slottable>
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export default Button

import { forwardRef } from "react"

import { cn } from "@shared/utils/cn"

import { InputProps, InputRef } from "./input.types"

const Input = forwardRef((props: InputProps, ref: InputRef) => {
  const {
    formInputSize,
    rounded,
    helpText,
    error,
    startIcon,
    endIcon,
    className,
    placeholder,
    onChange,
    maxLength,
    ...computedProps
  } = props

  return (
    <div className={cn("space-y-1.5", { "text-danger": error })}>
      <div className="flex">
        {startIcon && (
          <div className="flex items-center justify-center rounded-l border border-r-0 border-slate-300/60 bg-slate-100 px-3 py-2 text-slate-600 shadow-sm">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          onChange={e => {
            if (maxLength && e.target.value.length <= maxLength) {
              onChange?.(e)
            } else {
              onChange?.(e)
            }
          }}
          placeholder={placeholder ?? "Поиск..."}
          maxLength={maxLength}
          className={cn([
            "disabled:cursor-not-allowed disabled:bg-slate-100",
            "[&[readonly]]:cursor-not-allowed [&[readonly]]:bg-slate-100",
            "z-[1] w-full rounded-md border border-solid border-slate-300/60 text-sm font-normal shadow-sm transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:border-primary focus:border-opacity-40 focus:ring-4 focus:ring-primary focus:ring-opacity-20",
            formInputSize == "sm" && "px-2 py-1.5 text-xs",
            formInputSize == "lg" && "px-4 py-1.5 text-lg",
            error && "border-current focus:border-danger focus:ring-danger",
            rounded && "rounded-full",
            startIcon && "rounded-none rounded-r-md",
            endIcon && "rounded-none rounded-l-md",
            startIcon && endIcon && "rounded-none",
            className,
          ])}
          {...computedProps}
        />
        {endIcon && (
          <div className="flex items-center justify-center rounded-r border border-l-0 border-slate-300/60 bg-slate-100 px-3 py-2 text-slate-600 shadow-sm">
            {endIcon}
          </div>
        )}
      </div>
      <p className="mt-2 text-current">{helpText}</p>
    </div>
  )
})

export default Input

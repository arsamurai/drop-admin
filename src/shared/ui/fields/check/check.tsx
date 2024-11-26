import { cn } from "@shared/utils/cn"

import { CheckInputProps, CheckLabelProps, CheckProps } from "./check.types"

function Check(props: CheckProps) {
  return (
    <div {...props} className={cn(["flex items-center", props.className])}>
      {props.children}
    </div>
  )
}

Check.Label = (props: CheckLabelProps) => {
  return (
    <label {...props} className={cn(["ml-2 cursor-pointer", props.className])}>
      {props.children}
    </label>
  )
}

Check.Input = (props: CheckInputProps) => {
  return (
    <input
      {...props}
      className={cn([
        // Default
        "transition-all duration-100 ease-in-out",

        // Input type radio
        props.type == "radio" &&
          "cursor-pointer border-slate-300/80 shadow-sm focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:ring-offset-0",

        // Input type checkbox
        props.type == "checkbox" &&
          "cursor-pointer rounded border-slate-300/80 shadow-sm focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:ring-offset-0",

        // On checked
        "[&[type='radio']]:checked:border-primary/50 [&[type='radio']]:checked:border-opacity-10 [&[type='radio']]:checked:bg-primary/60",
        "[&[type='checkbox']]:checked:border-primary/50 [&[type='checkbox']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary/60",

        // On checked and not disabled
        "[&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:bg-slate-100",

        // On checked and disabled
        "[&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:opacity-70",
        props.className,
      ])}
    />
  )
}

export default Check

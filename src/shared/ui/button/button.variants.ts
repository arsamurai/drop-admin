import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  [
    "transition duration-200 border shadow-sm inline-flex items-center justify-center rounded-md font-medium text-base py-2 px-3 cursor-pointer",
    "focus:ring-4 focus:ring-primary focus:ring-opacity-20",
    "focus-visible:outline-none",
    "[&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90",
    "[&:not(button)]:text-center",
    "disabled:opacity-70 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary border-primary text-white",
        secondary: [
          "bg-secondary/70 border-secondary/70 text-slate-500",
          "[&:hover:not(:disabled)]:bg-slate-100 [&:hover:not(:disabled)]:border-slate-100",
        ],
        success: "bg-success border-success text-white",
        warning: "bg-warning border-warning text-white",
        pending: "bg-pending border-pending text-white",
        danger: "bg-danger border-danger text-white",
        dark: "bg-dark border-dark text-white",
      },
      size: {
        lg: "text-lg py-1.5 px-4",
        sm: "text-xs py-1.5 px-2",
      },
    },
  },
)

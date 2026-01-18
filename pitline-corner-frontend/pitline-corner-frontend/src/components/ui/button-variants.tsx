import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
        secondary:
          "bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-[0.98]",
        outline:
          "border-2 border-slate-300 bg-transparent text-slate-800 hover:bg-slate-50 active:scale-[0.98]",
        ghost:
          "text-slate-800 hover:bg-slate-100 active:scale-[0.98]",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]",
        link:
          "text-slate-800 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-3 rounded-lg",
        sm: "h-9 px-4 py-2 text-sm rounded-lg",
        lg: "h-14 px-8 py-4 text-lg rounded-lg",
        icon: "h-11 w-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

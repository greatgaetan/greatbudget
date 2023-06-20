import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const headingVariants = cva(
  "scroll-m-20 font-semibold tracking-tight transition-colors",
  {
    variants: {
      variant: {
        h1: "text-3xl font-extrabold lg:text-4xl",
        h2: "text-xl lg:text-2xl first:mt-0 tracking-tighter",
        h3: "text-lg lg:text-xl",
        h4: "text-base lg:text-lg",
      },
    },
    defaultVariants: {
      variant: "h1",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headingVariants> {
  asChild?: boolean
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : "h4"
    return (
      <Comp
        className={cn(headingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Composant de style shadcn/ui, écrit à la main (le CLI shadcn n'est pas accessible
// depuis mon environnement). Même API : variants + asChild.
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-base font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-indigo text-on-indigo hover:bg-indigo-deep",
        quiet: "border border-line bg-sheet text-ink hover:border-indigo",
      },
      size: {
        default: "min-h-11 px-5 py-2",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

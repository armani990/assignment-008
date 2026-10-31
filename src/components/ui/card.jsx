import { cva } from "class-variance-authority";
import { cn } from "cn";

const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow duration-300",
  {
    variants: {
      variant: {
        default: "border-border",
        outlined: "border-border/50",
        elevated: "border-border shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Card({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props} />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardContent };
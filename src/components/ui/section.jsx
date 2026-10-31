import { cva } from "class-variance-authority";
import { cn } from "cn";

const sectionVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        container: "container mx-auto px-4",
        narrow: "container mx-auto px-4 max-w-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Section({ className, variant = "default", children, ...props }) {
  return (
    <section
      className={cn(sectionVariants({ variant, className }))}
      {...props}
    >
      {children}
    </section>
  );
}

export { Section };
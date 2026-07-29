import * as React from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────
   Section
   Consistent section wrapper with padding and background.
   ───────────────────────────────────────────────────── */

type SectionPadding = "none" | "sm" | "md" | "lg" | "xl";
type SectionBackground =
  | "transparent"
  | "ivory"
  | "navy"
  | "gradient"
  | "gradient-hero";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: SectionPadding;
  bg?: SectionBackground;
  as?: React.ElementType;
  fullViewport?: boolean;
}

const paddingClasses: Record<SectionPadding, string> = {
  none: "",
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-20 lg:py-24",
  lg: "py-20 sm:py-24 lg:py-32",
  xl: "py-24 sm:py-32 lg:py-40",
};

const bgClasses: Record<SectionBackground, string> = {
  transparent: "",
  ivory: "bg-ivory-50 dark:bg-navy-1000",
  navy: "bg-navy-950 dark:bg-navy-1000",
  gradient: "bg-gradient-subtle dark:bg-gradient-subtle",
  "gradient-hero": "hero-section",
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      padding = "lg",
      bg = "transparent",
      as: Component = "section",
      fullViewport = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          fullViewport && "min-h-[100dvh] flex items-center",
          paddingClasses[padding],
          bgClasses[bg],
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Section.displayName = "Section";

export { Section, type SectionProps, type SectionPadding, type SectionBackground };

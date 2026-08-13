import * as React from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────
   Premium Card
   Card with consistent styling and hover elevation.
   ───────────────────────────────────────────────────── */

type CardVariant = "default" | "glass" | "feature" | "elevated";

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses: Record<CardVariant, string> = {
  default:
    "bg-card border border-border rounded-[var(--radius-card)] shadow-[var(--shadow-sm)]",
  glass: "glass-premium rounded-2xl",
  feature:
    "bg-card border border-border rounded-[var(--radius-card)] shadow-[var(--shadow-sm)] relative overflow-hidden",
  elevated:
    "bg-card border border-border rounded-[var(--radius-card)] shadow-[var(--shadow-lg)]",
};

const paddingClasses = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-6 lg:p-7",
  lg: "p-6 sm:p-8 lg:p-10",
} as const;

const PremiumCard = React.forwardRef<HTMLDivElement, PremiumCardProps>(
  (
    {
      className,
      variant = "default",
      hover = true,
      padding = "md",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          paddingClasses[padding],
          hover &&
            "transition-all duration-400 hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] hover:border-warmgray/50 dark:hover:border-warmgray/50",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

PremiumCard.displayName = "PremiumCard";

/* ─────────────────────────────────────────────────────
   Card Subcomponents
   ───────────────────────────────────────────────────── */

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

function CardIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl bg-gold-light/30 dark:bg-gold-deep/30 text-gold dark:text-gold border border-gold-light/50 dark:border-gold-deep/30",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-nearblack dark:text-warmwhite leading-snug",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm text-warmgray dark:text-warmgray leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export {
  PremiumCard,
  CardHeader,
  CardIcon,
  CardTitle,
  CardDescription,
  type PremiumCardProps,
  type CardVariant,
};

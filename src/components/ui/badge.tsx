import * as React from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────
   Premium Badge
   Consistent label/badge component.
   ───────────────────────────────────────────────────── */

type BadgeVariant =
  | "gold"
  | "navy"
  | "sage"
  | "rose"
  | "sky"
  | "outline"
  | "glass";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: "bg-gold-50 dark:bg-gold-950/30 text-gold-700 dark:text-gold-400 border border-gold-200/60 dark:border-gold-800/40",
  navy: "bg-navy-100 dark:bg-navy-800 text-navy-700 dark:text-navy-200 border border-navy-200 dark:border-navy-700",
  sage: "bg-sage-50 dark:bg-sage-700/15 text-sage-600 dark:text-sage-400 border border-sage-200 dark:border-sage-700/30",
  rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/30",
  sky: "bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800/30",
  outline:
    "bg-transparent text-navy-600 dark:text-navy-300 border border-navy-200 dark:border-navy-700",
  glass: "glass-premium text-navy-900 dark:text-ivory-50",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-[0.625rem]",
  md: "px-3 py-1 text-[0.6875rem]",
  lg: "px-4 py-1.5 text-xs",
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "gold", size = "md", icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-medium tracking-wide rounded-full whitespace-nowrap",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0 [&>svg]:h-3 [&>svg]:w-3">{icon}</span>}
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";

export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize };

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────
   Premium Button
   Luxury-grade button with CSS token integration.
   ───────────────────────────────────────────────────── */

type ButtonVariant =
  | "primary"
  | "secondary"
  | "gold"
  | "navy"
  | "ghost"
  | "outline"
  | "cta";

type ButtonSize = "sm" | "md" | "lg" | "xl";

interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  as?: React.ElementType;
  href?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-950 dark:bg-ivory-50 text-ivory-50 dark:text-navy-950 shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-md)]",
  gold: "bg-gradient-to-r from-gold-600 to-gold-700 text-ivory-50 shadow-[0_8px_30px_-5px_rgba(200,169,81,0.35)] hover:shadow-[0_14px_44px_-5px_rgba(200,169,81,0.45)] hover:-translate-y-0.5 active:translate-y-0",
  navy: "bg-navy-900 dark:bg-navy-800 text-ivory-50 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-gold-50 dark:bg-gold-950/30 text-gold-700 dark:text-gold-400 border border-gold-200/60 dark:border-gold-800/40 hover:bg-gold-100 dark:hover:bg-gold-950/50 hover:border-gold-300 dark:hover:border-gold-700",
  ghost: "bg-transparent text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-900 hover:text-navy-900 dark:hover:text-ivory-50",
  outline:
    "bg-transparent text-navy-900 dark:text-ivory-50 border border-navy-200 dark:border-navy-700 hover:bg-navy-50 dark:hover:bg-navy-900 hover:border-navy-300 dark:hover:border-navy-600",
  cta: "bg-gradient-to-r from-gold-600 to-gold-700 text-ivory-50 shadow-[var(--shadow-xl),var(--shadow-glow)] hover:shadow-[var(--shadow-2xl),var(--shadow-glow-lg)] hover:-translate-y-0.5 active:translate-y-0",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3.5 text-xs rounded-lg gap-1.5",
  md: "h-10 px-5 text-sm rounded-xl gap-2",
  lg: "h-12 px-7 text-[0.9375rem] rounded-xl gap-2.5",
  xl: "h-14 px-9 text-base rounded-2xl gap-2.5",
};

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "start",
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "group inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-300 select-none",
          "focus-visible:outline-2 focus-visible:outline-gold-500 focus-visible:outline-offset-3",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          loading && "pointer-events-none",
          className,
        )}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
          </span>
        )}
        <span className={cn("flex items-center gap-2", loading && "invisible")}>
          {icon && iconPosition === "start" && (
            <span className="shrink-0">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "end" && (
            <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
              {icon}
            </span>
          )}
        </span>
        {/* Hover shine overlay */}
        <span
          className="absolute inset-0 rounded-[inherit] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />
      </button>
    );
  },
);

PremiumButton.displayName = "PremiumButton";

export { PremiumButton, type PremiumButtonProps, type ButtonVariant, type ButtonSize };

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
    "bg-nearblack dark:bg-warmwhite text-warmwhite dark:text-nearblack shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-md)]",
  gold: "bg-gradient-to-r from-gold to-gold-deep text-warmwhite shadow-[0_8px_30px_-5px_rgba(184,168,138,0.35)] hover:shadow-[0_14px_44px_-5px_rgba(184,168,138,0.45)] hover:-translate-y-0.5 active:translate-y-0",
  navy: "bg-nearblack dark:bg-charcoal text-warmwhite shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-gold-light/30 dark:bg-gold-deep/30 text-gold-deep dark:text-gold border border-gold-light/60 dark:border-gold-deep/40 hover:bg-gold-light/50 dark:hover:bg-gold-deep/50 hover:border-gold-light dark:hover:border-gold-deep",
  ghost: "bg-transparent text-charcoal dark:text-warmgray hover:bg-warmwhite dark:hover:bg-nearblack hover:text-nearblack dark:hover:text-warmwhite",
  outline:
    "bg-transparent text-nearblack dark:text-warmwhite border border-stone dark:border-charcoal hover:bg-warmwhite dark:hover:bg-nearblack hover:border-warmgray dark:hover:border-charcoal",
  cta: "bg-gradient-to-r from-gold to-gold-deep text-warmwhite shadow-[var(--shadow-xl),var(--shadow-glow)] hover:shadow-[var(--shadow-2xl),var(--shadow-glow-lg)] hover:-translate-y-0.5 active:translate-y-0",
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
          "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-3",
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

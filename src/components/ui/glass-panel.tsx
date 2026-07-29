import * as React from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────
   Glass Panel
   Reusable glassmorphism container.
   ───────────────────────────────────────────────────── */

type GlassVariant = "default" | "premium" | "frosted" | "medical";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  hover?: boolean;
}

const variantClasses: Record<GlassVariant, string> = {
  default: "glass",
  premium: "glass-premium",
  frosted: "glass-frosted",
  medical: "glass-medical",
};

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = "default", hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          variantClasses[variant],
          "rounded-2xl",
          hover &&
            "transition-all duration-400 hover:shadow-[var(--shadow-lg)] hover:border-white/40 dark:hover:border-white/20",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassPanel.displayName = "GlassPanel";

export { GlassPanel, type GlassPanelProps, type GlassVariant };

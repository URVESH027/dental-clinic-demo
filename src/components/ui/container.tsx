import * as React from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────
   Container
   Max-width wrapper with responsive padding.
   ───────────────────────────────────────────────────── */

type ContainerWidth = "default" | "narrow" | "wide";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
}

const widthClasses: Record<ContainerWidth, string> = {
  default: "max-w-7xl",
  narrow: "max-w-5xl",
  wide: "max-w-[90rem]",
};

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, width = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-6 sm:px-10 lg:px-14",
          widthClasses[width],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = "Container";

export { Container, type ContainerProps, type ContainerWidth };

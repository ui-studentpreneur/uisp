import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Horizontal rhythm for the whole app — navbar, page content and footer all
 * measure from here, so this is the only place the max width should change.
 *
 * `max-w-7xl` (80rem / 1280px). Note this caps *layout* width; text measure is
 * a separate concern and stays narrow at the block level for readability.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8", className)}
      {...props}
    />
  );
}

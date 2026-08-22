import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * One visual style only — the gold-on-navy primary.
 *
 * Three gradients stack on this component, so each one lives on a different
 * layer to stay independent:
 *   border  → `border-gradient-gold`, a masked `::before` ring
 *   surface → `bg-gradient-donker` on the element's own background-image
 *   label   → `text-gradient-gold` on the inner `<span>`
 *
 * The label cannot share the element with the surface: `background-clip: text`
 * would clip the navy surface gradient to the glyphs instead of painting gold.
 */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center",
    "rounded-full font-medium whitespace-nowrap select-none",
    "border-gradient-gold bg-gradient-donker",
    // `background-color` is deliberately NOT transitioned. The base sets no
    // background-color, so animating it on press fades transparent → blue-500
    // while the gradient image is already gone — that gap is a white flash.
    "transition-[box-shadow,transform] outline-none",
    // Hover lifts with a gold-tinted shadow.
    "hover:shadow-lg hover:shadow-gold-500/25",
    // Pressed: drop the gradient so the flat blue-500 fill shows, in one paint.
    "active:bg-none active:bg-blue-500",
    "focus-visible:ring-3 focus-visible:ring-gold-500/40",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-4 text-xs",
        default: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "size-10 px-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

function Button({
  className,
  size = "default",
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ size, className }))}
      {...props}
    >
      {/*
        Icons are not text, so `background-clip: text` cannot paint them —
        they get a solid gold instead of the gradient.
      */}
      <span
        className={cn(
          "relative inline-flex items-center justify-center gap-2",
          "text-gradient-gold",
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-gold-400",
          "[&_svg:not([class*='size-'])]:size-4",
        )}
      >
        {children}
      </span>
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants, type ButtonProps };

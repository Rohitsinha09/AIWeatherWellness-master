import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type CustomCSSProperties = React.CSSProperties & {
  "--progress-value"?: string; // Define your custom CSS property
};
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative  h-3 w-full  rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    
    <ProgressPrimitive.Indicator
      className="h-3 w-3 flex-1 bg-primary rounded-full shadow-lg shadow-white ring-2 dark:ring-gray-500 animated-div"
      style={{
        "--progress-value": `${value}%`, // Pass the value as a CSS custom property
      } as CustomCSSProperties} // Cast the style attribute to your custom type
    />
   
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  icon?: React.ReactNode; // Add icon property to ProgressProps interface
}
type CustomCSSProperties = React.CSSProperties & {
  "--progress-value"?: string, // Define your custom CSS property
};
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  icon?: React.ReactNode;
  val2?: number;
  val3?: number;
}


const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, val2, val3 ,icon, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative  h-2 w-full rounded-full  bg-secondary",
      className
    )}
    {...props}
  > 
  <div className=" absolute w-[1.5px]   h-3 bg-white "
     style={{
      marginLeft:`${val2}px`
     }}></div>
  <div className=" absolute w-[1.5px]    h-3   bg-white "
  style={{
    marginLeft:`${val3}px`
  }}></div>
  <div className=" relative rounded-full animated-div" 
   style={{
    "--progress-value": `${value}px`, // Pass the value as a CSS custom property
  } as CustomCSSProperties} // Cast the style attribute to your custom type
  > {icon}</div>
    
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

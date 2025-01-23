import React from "react";
import { LucideProps, LucideIcon } from "lucide-react";

// Define your custom icon as a forward ref component
const GenderIcon: LucideIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  ({ size = 24, color = "currentColor", strokeWidth = 1, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        ref={ref} // Forward the ref to the SVG element
        {...props}
      >
        <path d="m19.869 2.175 -0.009 -0.031 -0.013 -0.041 -0.019 -0.034 -0.016 -0.031 -0.047 -0.056 -0.056 -0.047 -0.028 -0.016a0.313 0.313 0 0 0 -0.075 -0.031l-0.031 -0.009L19.5 1.875h-3.75a0.375 0.375 0 0 0 0 0.75h2.844L15.409 5.809A5.997 5.997 0 1 0 10.875 16.113V18.75h-2.625a0.375 0.375 0 0 0 0 0.75h2.625v2.25a0.375 0.375 0 0 0 0.75 0v-2.25h2.625a0.375 0.375 0 0 0 0 -0.75h-2.625v-2.637a5.994 5.994 0 0 0 4.294 -9.75L19.125 3.156v2.844a0.375 0.375 0 0 0 0.75 0V2.25zM11.25 15.375a5.25 5.25 0 1 1 5.25 -5.25A5.25 5.25 0 0 1 11.25 15.375" />
      </svg>
    );
  }
);

export default GenderIcon;

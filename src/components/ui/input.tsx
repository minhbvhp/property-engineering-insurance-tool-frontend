import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon, X } from "lucide-react";

export interface InputProps extends React.ComponentProps<"input"> {
  PrefixIcon?: LucideIcon;
  hasClear?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { PrefixIcon, hasClear, className, type, value, onChange, ...props },
    ref
  ) => {
    const handleClear = () => {
      if (onChange)
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="relative">
        {PrefixIcon ? (
          <PrefixIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4" />
        ) : (
          <></>
        )}

        <input
          value={value}
          onChange={onChange}
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border border-input bg-background py-2 text-base ring-offset-background file:border-0 f
            ile:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
            ${PrefixIcon ? "px-10" : "px-3"}`,
            className
          )}
          ref={ref}
          {...props}
        />

        {value && hasClear ? (
          <Button
            tabIndex={-1}
            variant="ghost"
            size="icon"
            type="button"
            className="absolute top-1/2 right-0 -translate-y-1/2 hover:bg-transparent"
            onClick={handleClear}
          >
            <X />
            <span className="sr-only">Clear</span>
          </Button>
        ) : (
          <></>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

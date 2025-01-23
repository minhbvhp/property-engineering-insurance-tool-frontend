import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, Lock, X } from "lucide-react";

export interface PasswordInputProps extends React.ComponentProps<"input"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClear = () => {
      if (onChange)
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="relative">
        <Lock className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4" />

        <input
          autoComplete="new-password"
          value={value}
          onChange={onChange}
          type={showPassword ? "text" : "password"}
          className={cn(
            `flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-base ring-offset-background file:border-0 f
            ile:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground 
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
            className
          )}
          ref={ref}
          {...props}
        />

        {value ? (
          <>
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

            {showPassword ? (
              <EyeIcon
                onClick={() => setShowPassword(false)}
                className="absolute top-1/2 right-8 -translate-y-1/2 hover:bg-transparent h-4 w-4 hover:cursor-pointer"
              />
            ) : (
              <EyeOffIcon
                onClick={() => setShowPassword(true)}
                className="absolute top-1/2 right-8 -translate-y-1/2 hover:bg-transparent h-4 w-4 hover:cursor-pointer"
              />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

interface FeedbackProps extends PropsWithChildren {
  type: string;
  className?: string;
}

export const FormFeedback = ({ children, className }: FeedbackProps) => {
  return (
    <div
      className={cn(
        "w-full mt-1 text-xs text-[var(--feedback-color)] font-medium",
        className
      )}
    >
      {children}
    </div>
  );
};

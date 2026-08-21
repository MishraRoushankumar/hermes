"use client";

import { cloneElement, isValidElement, forwardRef } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

export interface HintProps {
  label: string;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

const HintTrigger = forwardRef<HTMLElement, React.ComponentProps<"div">>((props, ref) => {
  const { children, ...rest } = props;
  if (!isValidElement(children)) return null;
  return cloneElement(children, {
    ...rest,
    ref,
  } as Record<string, unknown>);
});
HintTrigger.displayName = "HintTrigger";

export const Hint = ({
  label,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
}: HintProps) => {
  return (
    <TooltipProvider delay={100}>
      <Tooltip>
        <TooltipTrigger asChild>
  <HintTrigger>{children}</HintTrigger>
</TooltipTrigger>

        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

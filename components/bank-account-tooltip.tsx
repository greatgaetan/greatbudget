import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

interface BankAccountTooltipProps {
  icon: React.ReactNode
  text: string
  content: string
}

export default function BankAccountTooltip({
  icon,
  text,
  content,
}: BankAccountTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-2">
            {icon}
            <span className="text-sm lg:text-base">{text}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

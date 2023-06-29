import { Separator } from "@radix-ui/react-dropdown-menu"
import React, { useEffect, useState } from "react"
import { ControllerRenderProps } from "react-hook-form"
import { Input } from "./input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

export interface Option {
  value: string
  label: string
}

interface CreatableSelectProps {
  field: ControllerRenderProps<
    {
      category: string
      description: string
      amount: number
      type: "INCOME" | "EXPENSE"
    },
    "category"
  >
  options: Option[]
  onChange?: (value: Option) => void
}

const CreatableSelect: React.FC<CreatableSelectProps> = ({
  field,
  options,
  onChange,
}) => {
  const [currentValue, setCurrentValue] = useState<Option | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [search, setSearch] = useState("")

  return (
    <>
      <Input
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        placeholder="Create a new category..."
        className="w-full px-2 py-1 text-sm bg-background"
        disabled={currentValue !== null}
      />
      <div className="flex flex-row items-center justify-between">
        <Separator className="w-full h-px bg-input" />
        <span className="px-2 text-xs text-muted-foreground">or</span>
        <Separator className="w-full h-px bg-input" />
      </div>

      <Select
        value={currentValue ? currentValue.value : ""}
        onValueChange={field.onChange}
        disabled={search.length > 0}
      >
        <SelectTrigger>
          <SelectValue>
            {currentValue ? currentValue.label : "Choose a category..."}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default CreatableSelect

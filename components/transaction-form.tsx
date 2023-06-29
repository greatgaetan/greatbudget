"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Transaction,
  TransactionCategory,
  TransactionType,
} from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "./ui/button"
import CreatableSelect from "./ui/creatable-select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Separator } from "./ui/separator"
import { toast } from "./ui/use-toast"

const formSchema = z.object({
  category: z.string().nonempty("Please select a category."),
  description: z.string().max(50, "Description must be 50 characters or less."),
  amount: z.coerce
    .number()
    .positive()
    .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON, {
      message: "Amount must have two decimal places at most.",
    }),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]),
})

interface TransactionFormProps {
  formType: "create" | "update"
  transaction?: Pick<
    Transaction,
    "id" | "categoryId" | "description" | "amount" | "type"
  >
  usersCategories: TransactionCategory[]
  bankAccountId: string
}

export default function TransactionForm(props: TransactionFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [requestSucceeded, setRequestSucceeded] = React.useState(false)
  const [newCategory, setNewCategory] = React.useState("")

  const options = React.useMemo(
    () =>
      props.usersCategories?.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [props.usersCategories]
  )
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: props.transaction?.categoryId ?? "",
      description: props.transaction?.description ?? "",
      amount: props.transaction?.amount ?? 0,
      type: props.transaction?.type ?? TransactionType.INCOME,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    let method, apiUrl, successMessage
    switch (props.formType) {
      case "update":
        method = "PATCH"
        apiUrl = `/api/bank-accounts/${props.bankAccountId}/transactions/${props.transaction?.id}`
        successMessage = `Transaction updated.`
        break
      default:
        method = "POST"
        apiUrl = `/api/bank-accounts/${props.bankAccountId}/transactions`
        successMessage = `New transaction has been created.`
    }

    try {
      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          categoryName: newCategory,
        }),
      })
      const message = await response.json()

      if (!response.ok) {
        return toast({
          title: "Error",
          description: message,
          variant: "destructive",
        })
      }

      setRequestSucceeded(true)
      toast({
        title: "Success",
        description: successMessage,
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Unexpected error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <>
                  <Input
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    placeholder="Create a new category..."
                    className="w-full px-2 py-1 text-sm bg-background"
                    disabled={field.value.length > 0}
                  />
                  <div className="flex flex-row items-center justify-center">
                    <span className="text-muted-foreground text-sm">or</span>
                  </div>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    disabled={newCategory.length > 0}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {field.value.length > 0
                          ? options.find(
                              (option) => option.value === field.value
                            )?.label
                          : "Choose a category..."}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {field.value.length > 0 && (
                        <SelectItem className="text-destructive" value="">
                          Unselect category
                        </SelectItem>
                      )}
                      {options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Salary, groceries, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder={"289.99"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                  className="flex flex-col space-y-1"
                >
                  {Object.entries(TransactionType).map(([key, value]) => (
                    <FormItem
                      key={key}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={value} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {key[0] + key.toLowerCase().slice(1)}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading || requestSucceeded}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {props.formType === "update" ? "Save" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { BankAccount } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Please enter a name of at least 2 characters.",
    })
    .max(25, {
      message: "Please enter a name of at most 25 characters.",
    }),
})

interface BankAccountFormProps {
  formType: "create" | "update"
  bankAccount?: Pick<BankAccount, "id" | "name">
}

export default function BankAccountForm(props: BankAccountFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [requestSucceeded, setRequestSucceeded] = React.useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.bankAccount?.name ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    let method, apiUrl, successMessage
    switch (props.formType) {
      case "update":
        method = "PATCH"
        apiUrl = `/api/bank-accounts/${props.bankAccount?.id}`
        successMessage = `Bank account "${values.name}" updated.`
        break
      default:
        method = "POST"
        apiUrl = "/api/bank-accounts"
        successMessage = `New bank account "${values.name}" created.`
    }

    try {
      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Personal account" {...field} />
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

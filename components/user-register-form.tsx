"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { toast } from "./ui/use-toast"

export default function UserRegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [requestSucceeded, setRequestSucceeded] = React.useState(false)
  const router = useRouter()
  const t = useTranslations("user-register-form")
  const toastT = useTranslations("toast")
  const password = z
    .string()
    .min(8, {
      message: t("password-error-message-min"),
    })
    .max(50, {
      message: t("password-error-message-max"),
    })

  const formSchema = z
    .object({
      email: z.string().email({
        message: t("email-error-message"),
      }),
      password: password,
      confirmPassword: password,
      name: z.string().min(2, {
        message: t("name-error-message-min"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("confirm-password-error-message"),
      path: ["confirmPassword"], // path of error
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      const message = await response.json()

      if (!response.ok) {
        toast({
          title: toastT("error-title-default"),
          description: message,
          variant: "destructive",
        })
        return
      }

      setRequestSucceeded(true)
      toast({
        title: toastT("success-title-default"),
        description: toastT("success-register-account-created"),
        variant: "success",
      })
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      toast({
        title: toastT("error-title-default"),
        description: toastT("error-description-default"),
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email-label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@mail.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password-label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("password-placeholder")}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("confirm-password-label")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t("confirm-password-placeholder")}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name-label")}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={t("name-placeholder")}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={isLoading || requestSucceeded}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("submit-button")}
        </Button>
      </form>
    </Form>
  )
}

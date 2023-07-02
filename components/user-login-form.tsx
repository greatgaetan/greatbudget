"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import React from "react"
import { set, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { toast } from "./ui/use-toast"

export default function UserLoginForm() {
  const t = useTranslations("user-login-form")
  const toastT = useTranslations("toast")
  const formSchema = z.object({
    email: z.string().email({
      message: t("email-error-message"),
    }),
    password: z
      .string()
      .min(8, {
        message: t("password-error-message-min"),
      })
      .max(50, {
        message: t("password-error-message-max"),
      }),
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    })
    setIsLoading(false)

    if (!result?.ok || result?.error) {
      return toast({
        title: toastT("error-title-default"),
        description: toastT("error-login-form"),
        variant: "destructive",
      })
    }

    toast({
      title: toastT("success-login-title"),
      description: toastT("success-login-description"),
      variant: "success",
      duration: 3000,
    })
    router.push("/dashboard")
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
                  autoComplete="current-password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("submit-button")}
        </Button>
      </form>
    </Form>
  )
}

import { Heading } from "@/components/ui/heading"
import UserRegisterForm from "@/components/user-register-form"
import { Sparkles } from "lucide-react"
import { Metadata } from "next"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account",
}

export default function RegisterPage() {
  const t = useTranslations("register")

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Heading
          variant="h2"
          className="flex flex-row items-center justify-center gap-1"
        >
          {t("title")}
          <Sparkles className="h-6 w-6 ml-1 text-yellow-400" />
        </Heading>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>
      <UserRegisterForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          {t("to-login")}
        </Link>
      </p>
    </div>
  )
}

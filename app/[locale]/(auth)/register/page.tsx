import { Heading } from "@/components/ui/heading"
import UserRegisterForm from "@/components/user-register-form"
import { Sparkles } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account",
}

export default function RegisterPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Heading
          variant="h2"
          className="flex flex-row items-center justify-center gap-1"
        >
          Create an account
          <Sparkles className="h-6 w-6 ml-1 text-yellow-400" />
        </Heading>
        <p className="text-sm text-muted-foreground">
          Enter your personal informations to create an account
        </p>
      </div>
      <UserRegisterForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Already have an account? Sign In
        </Link>
      </p>
    </div>
  )
}

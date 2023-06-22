import { buttonVariants } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { ServerCrash } from "lucide-react"
import Link from "next/link"
import React from "react"

export const metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist",
}

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <Heading variant={"h1"} className="inline-flex items-center mb-4">
          Oops... <ServerCrash className="h-10 w-10 ml-4" />
        </Heading>
        <p className="text-lg mb-8">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Go back home
        </Link>
      </div>
    </div>
  )
}

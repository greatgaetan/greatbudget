import * as z from "zod"

export const bankAccountPatchSchema = z.object({
  name: z.string().min(2).max(25),
})

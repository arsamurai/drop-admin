import z from "zod"

import { ERROR } from "@shared/constants"

export type LoginSchema = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z.string().trim().min(1, ERROR.REQUIRED),
  password: z.string().min(1, ERROR.REQUIRED),
})

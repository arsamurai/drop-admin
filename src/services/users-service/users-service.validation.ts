import { z } from "zod"

import { ERROR } from "@shared/constants"
import { isValidPhone } from "@shared/utils/is-valid-phone"

export const userSchema = (id: number) => {
  return z.object({
    email: z.string().email(ERROR.INVALID_EMAIL),
    tg_username: z
      .string({ required_error: ERROR.INVALID_TG_USERNAME })
      .regex(/^[a-zA-Z0-9_]{4,32}$/),
    fullName: z.string().trim().min(1),
    phone: isValidPhone(),
    isVerifiedEmail: z.boolean().optional(),
    saleChannels: z.array(z.string().regex(/^\d+$/), { required_error: ERROR.REQUIRED }).optional(),
    weeklySales: z.string().nullable().optional(),
    password: id
      ? z
          .string()
          .optional()
          .refine(value => !value || value.length >= 8, {
            message: ERROR.INVALID_PASSWORD,
          })
      : z.string().min(8, ERROR.INVALID_PASSWORD),
  })
}
export type UserSchema = z.infer<ReturnType<typeof userSchema>>

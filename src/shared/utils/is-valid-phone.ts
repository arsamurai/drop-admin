import { z } from "zod"

import { ERROR } from "@shared/constants"

const UA_PROVIDERS = {
  vodafone: ["050", "066", "095", "099"],
  life: ["063", "073", "093"],
  kyivstar: ["067", "068", "096", "097", "098"],
  intertelecom: ["089", "094"],
}

export const isValidPhone = () => {
  const validPrefixes = Object.values(UA_PROVIDERS).flat()

  return z.string().refine(
    value => {
      const isValidPrefix = validPrefixes.some(prefix => value.startsWith(`38${prefix}`))
      const isValidLength = value.length === 12
      return isValidPrefix && isValidLength
    },
    { message: ERROR.INVALID_PHONE },
  )
}

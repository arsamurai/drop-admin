import { createContext, useContext } from "react"

import { AccessGuardProps } from "./access.types"

export const AccessContext = createContext<AccessGuardProps | null>(null)

export const useAccess = () => {
  const data = useContext(AccessContext)

  if (!data) {
    throw new Error("Can not `useUser` outside of the `UserProvider`")
  }

  return data
}

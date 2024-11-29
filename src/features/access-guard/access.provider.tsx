import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

import { checkToken } from "@services/auth-service/utils/check-token"

import { useGetMatches } from "@shared/hooks"

import { AccessContext } from "./access.context"

const AccessGuard = () => {
  const [token, setToken] = useState(false)
  const { filteredLast } = useGetMatches("authProtected")

  const isAuthProtectedPage = filteredLast?.handle.authProtected ?? false

  useEffect(() => {
    if (isAuthProtectedPage) {
      checkToken().then(token => {
        if (token) {
          setToken(true)
        }
      })
    }
  }, [isAuthProtectedPage])

  if (isAuthProtectedPage && !token) {
    return null
  }

  return (
    <AccessContext.Provider
      value={{
        isAuthProtectedPage,
      }}
    >
      <Outlet />
    </AccessContext.Provider>
  )
}

export default AccessGuard

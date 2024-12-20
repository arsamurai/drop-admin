import Cookies from "js-cookie"

import { ROUTES } from "@shared/constants"

import { publicApi } from "../api"
import { LoginParams, TokenType, Tokens, TokensResponse } from "./auth-service.types"

export class AuthService {
  static login = (params: LoginParams) => {
    return publicApi.post<TokensResponse>("/login", params)
  }

  static refreshTokens = () => {
    const refreshToken = Cookies.get(Tokens.refreshToken)

    if (!refreshToken) {
      throw Error("refreshToken not found")
    }

    const params = new URLSearchParams({
      refreshToken,
    })

    return publicApi.get<TokensResponse>(`/refresh-token?${params.toString()}`)
  }

  static get getAccessToken() {
    return Cookies.get(Tokens.token)
  }

  static setTokens = (tokens: Partial<TokenType<Tokens>>) => {
    Object.keys(tokens).forEach(key => {
      const tokenValue = tokens[key as keyof typeof Tokens]
      if (tokenValue) {
        Cookies.set(key, tokenValue)
      }
    })
  }

  static logout = (redirectUrl?: string) => {
    let redirectPage: string = ROUTES.AUTH.path

    if (redirectUrl) {
      const params = new URLSearchParams(window.location.search)
      params.set("redirect", redirectUrl)

      redirectPage += `?${params.toString()}`
    }

    Object.values(Tokens).map(value => Cookies.remove(value))
    localStorage.setItem("logout", String(Date.now()))

    window.location.replace(redirectPage)
  }
}

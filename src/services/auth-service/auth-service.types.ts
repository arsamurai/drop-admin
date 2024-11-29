import { LoginSchema } from "./auth-service.validation"

export enum Tokens {
  token = "token",
  refreshToken = "refreshToken",
}

export type TokenType<Variant extends Tokens> = Record<Variant, string>

// PARAMS
export type LoginParams = LoginSchema

// RESPONSES
export type TokensResponse = TokenType<Tokens>

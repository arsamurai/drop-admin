import axios, { AxiosRequestHeaders, CreateAxiosDefaults } from "axios"

import { UserService } from "@services/user-service"

import { requiredGet } from "@shared/utils/env"
import { removeTrailingSlash } from "@shared/utils/helpers"

const defaultInstanceSettings: CreateAxiosDefaults = {
  baseURL: removeTrailingSlash(requiredGet("VITE_API_URL")),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": requiredGet("VITE_BACKEND_HOST"),
  },
}

export const publicApi = axios.create(defaultInstanceSettings)
export const privateApi = axios.create(defaultInstanceSettings)

privateApi.interceptors.request.use(
  async config => {
    const token = UserService.getAccessToken

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token ?? ""}`,
    } as AxiosRequestHeaders

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

privateApi.interceptors.response.use(
  response => response,
  async function (error) {
    const originalRequest = error.config
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await UserService.refreshTokens()

        UserService.setTokens(response.data)

        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token
        return privateApi(originalRequest)
      } catch {
        UserService.logout(window.location.pathname)
      }
    }
    return Promise.reject(error)
  },
)

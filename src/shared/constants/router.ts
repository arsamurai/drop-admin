interface HandleParams {
  authProtected?: boolean
}

export interface RouterParams {
  path: string
  handle?: HandleParams
}

export const ROUTES = {
  ROOT: {
    path: "/",
    handle: {
      authProtected: true,
    },
  },
  404: {
    path: "/404",
  },
  AUTH: {
    path: "/auth",
  },
  USERS: {
    path: "/users",
  },
} satisfies Record<string, RouterParams>

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
  CREATE_USER: {
    path: "/user/create",
  },
  EDIT_USER: {
    path: "/user/edit",
  },
} satisfies Record<string, RouterParams>

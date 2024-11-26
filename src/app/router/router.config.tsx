import { AuthPage, MainPage, NotFoundPage, UsersPage } from "@pages"
import { Navigate, createBrowserRouter } from "react-router-dom"

import { AccessGuard } from "@features/access-guard"
import { RootLayout } from "@features/layouts"

import { ROUTES } from "@shared/constants"

export const router = createBrowserRouter([
  {
    element: <AccessGuard />,
    errorElement: <Navigate to={ROUTES[404].path} replace />,
    children: [
      {
        path: ROUTES.ROOT.path,
        handle: ROUTES.ROOT.handle,
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: ROUTES.USERS.path,
            element: <UsersPage />,
          },
        ],
      },
      {
        path: ROUTES.AUTH.path,
        element: <AuthPage />,
      },
      {
        path: ROUTES[404].path,
        element: <NotFoundPage />,
      },
    ],
  },
])
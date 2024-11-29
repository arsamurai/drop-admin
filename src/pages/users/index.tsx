import { Link } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { Button } from "@shared/ui/button"
import { Typography } from "@shared/ui/typography"

import { UsersTable } from "./users-table"

const UsersPage = () => {
  return (
    <div className="w-full space-y-6 sm:space-y-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Typography as="h1" variant="pageTitle">
          Користувачі
        </Typography>
        <Button variant="primary" size="sm" className="w-fit" asChild>
          <Link to={ROUTES.CREATE_USER.path}>Create user</Link>
        </Button>
      </div>
      <UsersTable />
    </div>
  )
}
export default UsersPage

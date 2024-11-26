import { Typography } from "@shared/ui/typography"

const UsersPage = () => {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12">
        <div className="flex flex-col gap-y-3 md:h-10 md:flex-row md:items-center">
          <Typography as="h1" variant="pageTitle">
            Users
          </Typography>
        </div>
      </div>
    </div>
  )
}
export default UsersPage

import { createColumnHelper } from "@tanstack/react-table"
import { useMemo } from "react"

import { UserEntity, useRelationsQuery } from "@services/users-service"

import UsersOptions from "../components/user-options"
import UserVerified from "../components/user-verified"

export const useUsersColumns = () => {
  const columnHelper = createColumnHelper<UserEntity>()
  const { data } = useRelationsQuery()

  const columns = useMemo(
    () => [
      columnHelper.accessor("email", {
        header: "Email",
        cell: info => (
          <a href={`mailto:${info.getValue()}`} className="text-primary">
            {info.getValue()}
          </a>
        ),
      }),
      columnHelper.accessor("tg_username", {
        header: "Телеграм",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("fullName", {
        header: "Ім'я",
        cell: info => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("phone", {
        header: "Телефон",
        cell: info => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor("isVerifiedEmail", {
        header: "Не/Варифікований",
        cell: info => <UserVerified user={info.row.original} />,
        enableSorting: false,
      }),
      columnHelper.accessor("saleChannels", {
        header: "Канали продажу",
        cell: info => (info.getValue().length ? info.getValue().length : ""),
        enableSorting: false,
      }),
      columnHelper.accessor("weeklySales", {
        header: "Продажів за тиждень",
        cell: info => data?.weeklySales.find(item => item.value === info.getValue())?.label,
        enableSorting: false,
      }),
      columnHelper.display({
        id: "action",
        cell: info => <UsersOptions user={info.row.original} />,
      }),
    ],
    [columnHelper, data?.weeklySales],
  )
  return { columns }
}

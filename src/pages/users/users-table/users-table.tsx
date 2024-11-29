import {
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { UsersParams, useUsersQuery } from "@services/users-service"

import { useFiltersParams } from "@shared/hooks"
import { Button } from "@shared/ui/button"
import { Input, Label } from "@shared/ui/fields"
import { Loading } from "@shared/ui/loading"
import { PageSize, Pagination } from "@shared/ui/pagination"
import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

import { useUsersColumns } from "./hooks/use-users-table"

const UsersTable = () => {
  const { columns } = useUsersColumns()
  const { filters, onChangeParam, onSort, onReset } = useFiltersParams<UsersParams>([
    "query",
    "page",
    "pageSize",
    "sort",
    "order",
  ])

  const pagination: PaginationState = {
    pageIndex: filters.page ? Number(filters.page) : 1,
    pageSize: filters.pageSize ? Number(filters.pageSize) : 10,
  }
  const sorting: SortingState = [
    {
      id: "email",
      desc: filters.sort === "email" && filters.order === "DESC",
    },
    {
      id: "tg_username",
      desc: filters.sort === "tg_username" && filters.order === "DESC",
    },
  ]

  const { data, isLoading, isPlaceholderData } = useUsersQuery({
    ...filters,
    page: pagination.pageIndex.toString(),
    pageSize: pagination.pageSize.toString(),
  })

  const isPagination = data?.data && data.pagination.total[0] > data.pagination.perPage
  const totalPages =
    data?.pagination.total[0] && data?.pagination.perPage
      ? Math.ceil(data?.pagination.total[0] / data?.pagination.perPage)
      : 0
  const tableConfig = useReactTable({
    data: data?.data ?? [],
    columns,
    rowCount: totalPages,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: updaterOrValue => {
      if (typeof updaterOrValue === "function") {
        const newPageState = updaterOrValue(pagination)
        onChangeParam("page", String(newPageState.pageIndex))
      }
    },
    onSortingChange: updaterOrValue => {
      if (typeof updaterOrValue === "function") {
        const newSortingState = updaterOrValue(sorting)
        newSortingState.map(item => {
          onSort(item.id, item.desc ? "DESC" : "ASC")
        })
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    enableSortingRemoval: false,
    maxMultiSortColCount: 1,
  })

  if (isLoading) {
    return <Loading />
  }

  if (!data?.data && !isLoading) {
    return (
      <Typography as="h3" variant="itemTitle" className="my-16 text-center">
        Упс... Нічого не знайдено!
      </Typography>
    )
  }

  return (
    <div className="box box--stacked">
      <div className="flex flex-wrap items-center justify-between gap-5 p-5">
        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-5">
            <Label className="whitespace-nowrap">Пошук:</Label>
            <Input
              name="query"
              value={filters?.query ?? ""}
              onChange={e => {
                onChangeParam("query", e.target.value)
                onChangeParam("page", "1")
              }}
              placeholder="Шукаю..."
            />
          </div>
          <PageSize
            total={data?.pagination.total[0] ?? 0}
            options={[10, 50, 100]}
            value={pagination.pageSize}
            onChange={option => {
              onChangeParam("pageSize", option.toString())
              onChangeParam("page", "1")
            }}
          />
        </div>
        <Button variant="pending" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      <div className="scrollbar-hidden overflow-x-auto">
        <table className="w-full min-w-[1250px]">
          <thead>
            {tableConfig.getHeaderGroups().map(headerGroup => (
              <tr
                key={headerGroup.id}
                className="border-y border-solid border-slate-200/60 bg-slate-50 font-medium text-slate-500"
              >
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="m-0 p-0">
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            "relative h-full select-none bg-transparent p-4 text-left",
                            {
                              "cursor-pointer hover:bg-slate-100/80": header.column.getCanSort(),
                            },
                          )}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: (
                              <span className="absolute right-4 top-1/2 size-0 -translate-y-1/2 border-b-[6px] border-l-[5px] border-r-[5px] border-transparent border-b-[#666] text-[#666]"></span>
                            ),
                            desc: (
                              <span className="absolute right-4 top-1/2 size-0 -translate-y-1/2 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent border-t-[#666] text-[#666]"></span>
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className={cn({ "pointer-events-none cursor-wait opacity-50": isPlaceholderData })}
          >
            {tableConfig.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className={cn(
                  "cursor-pointer border-b border-dashed border-slate-200 hover:bg-slate-100",
                  {
                    "bg-slate-50": (row.index + 1) % 2 === 0,
                  },
                )}
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-4 py-5 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isPagination && (
        <div className="py-5">
          <Pagination
            totalPages={totalPages}
            currentPage={pagination.pageIndex}
            onPageChange={page => tableConfig.setPageIndex(page)}
          />
        </div>
      )}
    </div>
  )
}
export default UsersTable

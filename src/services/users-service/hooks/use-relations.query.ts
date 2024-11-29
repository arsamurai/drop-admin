import { useQuery } from "@tanstack/react-query"

import { UsersService } from "../users-service"

export const useRelationsQuery = () => {
  return useQuery({
    queryKey: ["relations"],
    queryFn: () => UsersService.getRelations(),
    select: response => {
      const weeklySalesList = Object.entries(response.data.data?.weeklySales ?? {})

      return {
        saleChannels: response.data.data.saleChannels.map(item => ({
          label: item.name,
          value: item.id.toString(),
        })),
        weeklySales: weeklySalesList.map(([value, label]) => ({
          label,
          value,
        })),
      }
    },
  })
}

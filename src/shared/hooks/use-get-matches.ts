import { useMatches } from "react-router-dom"

import { RouterParams } from "@shared/constants"

type HandleParam = Required<Pick<RouterParams, "handle">>
type HandleNames = keyof HandleParam["handle"]

const hasHandle = (route: HandleParam): route is HandleParam => {
  return !!route.handle
}

export const useGetMatches = (handle: HandleNames) => {
  const matches = useMatches() as HandleParam[]

  const allHandles = matches.filter(hasHandle)
  const filteredLast = allHandles.findLast(route => route.handle[handle])

  return {
    matches,
    filteredLast,
    handle: allHandles,
  }
}

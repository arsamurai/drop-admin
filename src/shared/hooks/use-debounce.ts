import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(t)
    }
  }, [value, delay])
  return debouncedValue
}

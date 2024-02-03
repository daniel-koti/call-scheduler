import { getBlockedDates } from '@/services/get-blocked-dates'
import { useQuery } from '@tanstack/react-query'

interface BlockedDates {
  blockedWeekDays: number[]
}

export function useGetBlockedDays(
  username: string,
  date: { year: string; month: string },
) {
  const { data, isLoading, isFetching } = useQuery<BlockedDates>({
    queryKey: ['blocked-dates', username, date],
    queryFn: () => getBlockedDates(username, date),
    enabled: !!date,
  })

  return {
    data,
    isLoading,
    isFetching,
  }
}

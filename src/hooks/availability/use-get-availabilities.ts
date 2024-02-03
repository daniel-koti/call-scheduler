import { Availability } from '@/pages/schedule/[username]/ScheduleForm/calendar-step'
import { getAvailabilityTimes } from '@/services/availability/get-availability-times'
import { useQuery } from '@tanstack/react-query'

export function useGetAvailabilities(username: string, date: string | null) {
  const { data, isLoading, isFetching } = useQuery<Availability>({
    queryKey: ['availability', username, date],
    queryFn: () => getAvailabilityTimes(username, date),
    enabled: !!date,
  })

  return {
    data,
    isLoading,
    isFetching,
  }
}

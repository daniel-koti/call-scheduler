import { api } from '@/lib/axios'

export async function getBlockedDates(
  username: string,
  date: { year: string; month: string },
) {
  const response = await api.get(`/users/${username}/blocked-dates`, {
    params: {
      year: date.year,
      month: date.month,
    },
  })

  return response.data
}

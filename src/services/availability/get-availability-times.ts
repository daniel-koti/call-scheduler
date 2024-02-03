import { api } from '@/lib/axios'

export async function getAvailabilityTimes(
  username: string,
  date: string | null,
) {
  const response = await api.get(`/users/${username}/availability`, {
    params: {
      date,
    },
  })

  return response.data
}

import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

import dayjs from 'dayjs'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)
  const { year, month } = req.query

  if (!year || !month) {
    return res.status(400).json({ message: 'Year or month not specified' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exists' })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = Array.from(Array(7).keys()).filter(
    (weekDay) =>
      !availableWeekDays.some(
        (availableWeekDay) => availableWeekDay.week_day === weekDay,
      ),
  )
  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`

SELECT
    EXTRACT(DAY FROM S.DATE) AS date,
    COUNT(S.date) AS amount,
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

  FROM schedulings S

  LEFT JOIN user_time_intervals UTI
    ON EXTRACT(DOW FROM S.date) = UTI.week_day + 1 -- Adiciona 1 ao dia da semana para corresponder ao padrão PostgreSQL (domingo = 1)

  WHERE S.user_id = ${user.id}
    AND TO_CHAR(S.date, 'YYYY-MM') = '${year}-${month}'

  GROUP BY EXTRACT(DAY FROM S.DATE),
    ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)

  HAVING COUNT(S.date) >= ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)`

  const blockedDates = blockedDatesRaw.map((item) => item.date)

  return res.json({ blockedWeekDays, blockedDates })
}

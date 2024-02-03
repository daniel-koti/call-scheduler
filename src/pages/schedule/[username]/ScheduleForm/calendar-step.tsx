import { useState } from 'react'
import { useRouter } from 'next/router'
import { Calendar } from '@/components/calendar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import dayjs from 'dayjs'
import { useGetAvailabilities } from '@/hooks/availability/use-get-availabilities'

export interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const isDateSelected = !!selectedDate
  const username = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWhitoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useGetAvailabilities(
    username,
    selectedDateWhitoutTime,
  )

  return (
    <Card
      data-istimepickeropen={isDateSelected}
      className="data-[istimepickeropen=false]:grid-cols-1fr relative mx-auto mb-0 mt-6 grid max-w-full grid-cols-1 p-0 data-[istimepickeropen=false]:w-[540px] data-[istimepickeropen=true]:grid-cols-[1fr_280px]"
    >
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <div className="absolute bottom-0 right-0 top-0 w-[280px] overflow-y-scroll border-l border-zinc-200 px-6 pb-0 pt-6">
          <header className="text-sm font-medium text-zinc-500">
            {weekDay}, <span className=" text-zinc-900">{describedDate}</span>
          </header>
          <div className="mt-3 grid grid-cols-2 gap-2 pb-4 md:grid-cols-1">
            {availability?.possibleTimes.map((hour) => {
              return (
                <Button
                  disabled={!availability.availableTimes.includes(hour)}
                  key={hour}
                >
                  {String(hour).padStart(2, '0')}:00h
                </Button>
              )
            })}
          </div>
        </div>
      )}
    </Card>
  )
}

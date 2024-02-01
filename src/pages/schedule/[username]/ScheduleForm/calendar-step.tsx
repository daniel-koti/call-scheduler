import { useState } from 'react'
import { Calendar } from '@/components/calendar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import dayjs from 'dayjs'

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

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
          <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-1">
            <Button>08:00h</Button>
            <Button>09:00h</Button>
            <Button>10:00h</Button>
            <Button>11:00h</Button>
            <Button>12:00h</Button>
            <Button>13:00h</Button>
            <Button>14:00h</Button>
            <Button>15:00h</Button>
            <Button>16:00h</Button>
            <Button>17:00h</Button>
            <Button className="mb-4">18:00h</Button>
          </div>
        </div>
      )}
    </Card>
  )
}

import dayjs from 'dayjs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { getWeekDays } from '@/utils/get-week-days'
import { useMemo, useState } from 'react'

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  const calendarWeeks = useMemo(() => {
    const daysInMonthArray = Array.from({
      length: currentDate.daysInMonth(),
    }).map((_, i) => {
      return currentDate.set('date', i + 1)
    })

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from({
      length: firstWeekDay,
    })
      .map((_, i) => {
        return currentDate.subtract(i + 1, 'day')
      })
      .reverse()

    return [...previousMonthFillArray, ...daysInMonthArray]
  }, [currentDate])

  console.log(calendarWeeks)

  function handlePreviousMonth() {
    // decreases one month
    const previousMonthDate = currentDate.subtract(1, 'month')
    setCurrentDate(previousMonthDate)
  }

  function handleNextMonth() {
    const nextMonthDate = currentDate.add(1, 'month')
    setCurrentDate(nextMonthDate)
  }

  return (
    <div className="flex flex-col gap-2 p-6">
      <header className="flex items-center justify-between">
        <strong className="text-lg font-semibold capitalize text-zinc-900">
          {currentMonth} <span className="text-zinc-800">{currentYear}</span>
        </strong>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="hover:bg-zinc-200"
            title="Previous month"
            onClick={handlePreviousMonth}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="hover:bg-zinc-200"
            title="Next month"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <table className="w-full table-fixed border-spacing-[0.25rem]">
        <thead>
          <tr>
            {shortWeekDays.map((day) => (
              <th className="text-sm font-medium text-zinc-400" key={day}>
                {day}.
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="before:block before:leading-4 before:text-zinc-50 before:content-['.']">
          <tr>
            <td className="box-border"></td>
            <td className="box-border"></td>
            <td className="box-border"></td>
            <td className="box-border"></td>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center hover:bg-zinc-200"
              >
                1
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center hover:bg-zinc-200"
              >
                2
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center hover:bg-zinc-200"
              >
                3
              </Button>
            </td>
          </tr>
          <tr>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center"
              >
                1
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center"
              >
                1
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center"
              >
                1
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center"
              >
                1
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center"
              >
                1
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center"
              >
                2
              </Button>
            </td>
            <td className="box-border">
              <Button
                variant="secondary"
                size="sm"
                className="aspect-square h-auto w-full items-center"
              >
                3
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

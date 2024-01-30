import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { getWeekDays } from '@/utils/get-week-days'

interface CalendarWeek {
  week: number
  days: Array<{
    date: dayjs.Dayjs
    disabled: boolean
  }>
}

type CalendarWeeks = CalendarWeek[]

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

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from({
      length: 7 - (lastWeekDay + 1),
    }).map((_, i) => {
      return lastDayInCurrentMonth.add(i + 1, 'day')
    })

    const calendarDays = [
      ...previousMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
      ...daysInMonthArray.map((date) => {
        return {
          date,
          disabled: false,
        }
      }),
      ...nextMonthFillArray.map((date) => {
        return {
          date,
          disabled: true,
        }
      }),
    ]

    const calendarWeeks = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({
            week: i / 7 + 1,
            days: original.slice(i, i + 7),
          })
        }

        return weeks
      },
      [],
    )

    return calendarWeeks
  }, [currentDate])

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
          {calendarWeeks.map(({ week, days }) => {
            return (
              <tr key={week}>
                {days.map(({ date, disabled }) => {
                  return (
                    <td key={date.toString()} className="box-border">
                      <Button
                        disabled={disabled}
                        variant="secondary"
                        size="sm"
                        className="aspect-square h-auto w-full items-center hover:bg-zinc-200"
                      >
                        {date.get('date')}
                      </Button>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

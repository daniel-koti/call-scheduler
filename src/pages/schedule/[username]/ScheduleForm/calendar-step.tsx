import { Calendar } from '@/components/calendar'
import { Card } from '@/components/ui/card'

export function CalendarStep() {
  return (
    <Card className="relative mx-auto mb-0 mt-6 grid w-[540px] max-w-full grid-cols-1 p-0">
      <Calendar />
    </Card>
  )
}

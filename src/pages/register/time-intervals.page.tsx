import { MultiStep } from '@/components/multistep'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { getWeekDays } from '@/utils/get-week-days'
import { ArrowRight } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const weekDays = getWeekDays()

  async function handleSetTimeIntervals() {}

  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4 py-0">
      <div className="py-0">
        <strong className="text-base">Quase lá!</strong>
        <p className="mb-6 text-zinc-800">
          Defina o intervalo de horário que você está disponível em cada dia da
          semana.
        </p>
      </div>

      <MultiStep currentStep={3} steps={4} />

      <form className="mt-6 flex flex-col rounded-[6px] border border-zinc-200 bg-zinc-100 p-4">
        <div className="mb-4 rounded-[6px] border  border-zinc-200">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center justify-between border-b border-zinc-200 p-4"
            >
              <div className="flex items-center gap-3">
                <Checkbox />
                <span>{weekDays[field.weekDay]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.startTime`)}
                />
                <Input
                  type="time"
                  step={60}
                  {...register(`intervals.${index}.endTime`)}
                />
              </div>
            </div>
          ))}
        </div>

        <Button>
          Próximo passo <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </form>
    </main>
  )
}

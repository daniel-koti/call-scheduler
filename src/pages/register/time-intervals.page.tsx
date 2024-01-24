import { FormError } from '@/components/form-error'
import { MultiStep } from '@/components/multistep'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos 1 dia da semana',
    }),
})

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
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

  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const weekDays = getWeekDays()

  async function handleSetTimeIntervals(data: TimeIntervalsFormData) {
    console.log(data)
  }

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

      <form
        onSubmit={handleSubmit(handleSetTimeIntervals)}
        className="mt-6 flex flex-col rounded-[6px] border border-zinc-200 bg-zinc-100 p-4"
      >
        <div className="mb-4 rounded-[6px] border  border-zinc-200">
          {fields.map((field, index) => {
            const isIntervalDisabled = intervals[index].enabled === false

            return (
              <>
                {index > 0 && <Separator />}
                <div
                  key={field.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          checked={field.value}
                        />
                      )}
                    />

                    <span>{weekDays[field.weekDay]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.startTime`)}
                      disabled={isIntervalDisabled}
                    />
                    <Input
                      type="time"
                      step={60}
                      {...register(`intervals.${index}.endTime`)}
                      disabled={isIntervalDisabled}
                    />
                  </div>
                </div>
              </>
            )
          })}
        </div>

        {errors.intervals?.root?.message && (
          <div className="mb-4">
            <FormError description={errors.intervals.root.message} />
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Próximo passo{' '}
          {!isSubmitting && <ArrowRight className="ml-1 h-4 w-4" />}
        </Button>
      </form>
    </main>
  )
}

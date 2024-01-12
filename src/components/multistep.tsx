interface MultiStepProps {
  steps: number
  currentStep: number
}

export function MultiStep({ currentStep, steps }: MultiStepProps) {
  return (
    <div>
      <span className="block">
        Passo {currentStep} de {steps}
      </span>
      <div className="mt-4 flex items-center gap-2">
        {Array.from({ length: steps }, (_, i) => i + 1).map((step) => {
          const isActive = currentStep >= step

          return (
            <div
              key={step}
              data-active={isActive}
              className="h-2 w-full rounded-full bg-zinc-200 data-[active=true]:bg-zinc-800 "
            />
          )
        })}
      </div>
    </div>
  )
}

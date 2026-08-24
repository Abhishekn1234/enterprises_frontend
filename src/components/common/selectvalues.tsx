import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SelectField({
  control,
  name,
  label,
  options,
}: {
  control: any
  name: string
  label: string
  options: string[]
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const currentValue = field.value ?? ''

        // Make sure the edit value is available in the dropdown.
        // Example: API returns "Bias" but options may not contain it.
        const selectOptions = currentValue &&
          !options.includes(currentValue)
          ? [currentValue, ...options]
          : options

        return (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium text-slate-700">
              {label}
            </FormLabel>

            <Select
              value={currentValue}
              onValueChange={(value) => {
                field.onChange(value)
              }}
            >
              <FormControl>
                <SelectTrigger
                  className="
                    h-10
                    w-full
                    rounded-md
                    border-slate-300
                    bg-white
                    px-3
                    text-sm
                    text-slate-900
                    shadow-sm
                    transition-all
                    hover:border-slate-400
                    focus:border-slate-500
                    focus:ring-2
                    focus:ring-slate-200
                    data-[placeholder]:text-slate-400
                  "
                >
                  <SelectValue
                    placeholder={`Select ${label.replace(' *', '')}`}
                  />
                </SelectTrigger>
              </FormControl>

              <SelectContent
                className="
                  rounded-md
                  border-slate-200
                  bg-white
                  shadow-lg
                "
              >
                {selectOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="
                      cursor-pointer
                      rounded-sm
                      px-3
                      py-2
                      text-sm
                      text-slate-700
                      focus:bg-slate-100
                      focus:text-slate-900
                    "
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage className="text-xs" />
          </FormItem>
        )
      }}
    />
  )
}
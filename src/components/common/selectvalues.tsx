
import {
  Control,
  FieldPath,
  FieldValues,
} from 'react-hook-form'
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

interface SelectFieldProps<
  TFieldValues extends FieldValues,
> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  options: string[]
  placeholder?: string
  disabled?: boolean
}

export function SelectField<
  TFieldValues extends FieldValues,
>({
  control,
  name,
  label,
  options,
  placeholder = 'Select an option',
  disabled = false,
}: SelectFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>

          <Select
            value={field.value ?? ''}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="h-10 w-full bg-white">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent
              position="popper"
              sideOffset={5}
              className="
                z-[9999]
                max-h-60
                w-[var(--radix-select-trigger-width)]
                overflow-y-auto
                bg-white
                shadow-lg
                border
              "
            >
              {options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="cursor-pointer"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
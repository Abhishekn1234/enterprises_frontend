import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  uppercase?: boolean
}

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  uppercase = false,
}: TextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Input
              {...field}
              value={field.value ?? ''}
              placeholder={placeholder}
              onChange={(event) =>
                field.onChange(
                  uppercase
                    ? event.target.value.toUpperCase()
                    : event.target.value,
                )
              }
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
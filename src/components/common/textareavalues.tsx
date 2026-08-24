import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

interface TextareaFieldProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  className?: string
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
}: TextareaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Textarea
              {...field}
              value={field.value ?? ''}
              placeholder={placeholder}
              className={className ?? 'min-h-[100px]'}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
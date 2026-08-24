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
      render={({ field, fieldState }) => (
        <FormItem className="space-y-2">
          <FormLabel
            className={`text-sm font-medium ${
              fieldState.error
                ? 'text-red-600'
                : 'text-slate-700'
            }`}
          >
            {label}
          </FormLabel>

          <FormControl>
            <Input
              {...field}
              value={field.value ?? ''}
              placeholder={placeholder}
              aria-invalid={!!fieldState.error}
              className={`
                h-10
                w-full
                rounded-md
                bg-white
                px-3
                text-sm
                text-slate-900
                shadow-sm
                transition-all
                placeholder:text-slate-400

                ${
                  fieldState.error
                    ? `
                      border-red-500
                      focus:border-red-500
                      focus:ring-2
                      focus:ring-red-100
                    `
                    : `
                      border-slate-300
                      hover:border-slate-400
                      focus:border-slate-500
                      focus:ring-2
                      focus:ring-slate-200
                    `
                }
              `}
              onChange={(event) => {
                const value = event.target.value

                field.onChange(
                  uppercase
                    ? value.toUpperCase()
                    : value,
                )
              }}
            />
          </FormControl>

          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  )
}
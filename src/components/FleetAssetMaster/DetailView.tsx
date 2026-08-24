interface DetailItemProps {
  label: string
  value?: string | number | null
}

export function DetailItem({
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-sm">
        {label}
      </p>

      <p className="text-sm font-medium">
        {value || '-'}
      </p>
    </div>
  )
}

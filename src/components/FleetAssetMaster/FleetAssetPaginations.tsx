import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

interface FleetAssetPaginationProps {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}

export default function FleetAssetPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: FleetAssetPaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground text-sm">
        Showing{' '}
        <span className="font-medium text-foreground">
          {start}
        </span>{' '}
        to{' '}
        <span className="font-medium text-foreground">
          {end}
        </span>{' '}
        of{' '}
        <span className="font-medium text-foreground">
          {total}
        </span>{' '}
        assets
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>

        <div className="text-sm">
          Page{' '}
          <span className="font-medium">
            {page}
          </span>{' '}
          of{' '}
          <span className="font-medium">
            {totalPages}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
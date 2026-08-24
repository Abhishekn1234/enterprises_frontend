import { useEffect, useState } from 'react'
import { Filter, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import type {
  AssetStatus,
  AssetType,
  FleetAssetFiltersState,
  FleetAssetSortField,
  FleetAssetSortOrder,
} from '@/features/FleetAssetMaster/domain/entities/FleetAsset'
import { brands } from '../data/values'

interface Props {
  search: string
  filters: FleetAssetFiltersState
  sort: FleetAssetSortField
  order: FleetAssetSortOrder

  onSearchChange: (value: string) => void

  onFilterApply: (
    filters: FleetAssetFiltersState,
  ) => void

  onSortChange: (value: {
    sort: FleetAssetSortField
    order: FleetAssetSortOrder
  }) => void
}



export default function FleetAssetFilters({
  search,
  filters,
  sort,
  order,
  onSearchChange,
  onFilterApply,
  onSortChange,
}: Props) {
  const [open, setOpen] = useState(false)

  const [localFilters, setLocalFilters] =
    useState<FleetAssetFiltersState>(filters)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleApply = () => {
    onFilterApply(localFilters)
    setOpen(false)
  }

  const handleClear = () => {
    const cleared: FleetAssetFiltersState = {}

    setLocalFilters(cleared)
    onFilterApply(cleared)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      {/* ================= SEARCH ================= */}

      <div className="relative w-full md:max-w-sm">
        <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

        <Input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search fleet assets..."
          className="h-10 pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {/* ================= FILTER ================= */}

        <Sheet
          open={open}
          onOpenChange={setOpen}
        >
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-10"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </SheetTrigger>

          <SheetContent
            className="
              w-full
              bg-white
              sm:max-w-md
            "
          >
            <SheetHeader className="border-b pb-4">
              <SheetTitle>
                Filter Fleet Assets
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 px-4 py-6">
              {/* ================= ASSET TYPE ================= */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Asset Type
                </label>

                <Select
                  value={
                    localFilters.assetType ??
                    'all'
                  }
                  onValueChange={(value) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      assetType:
                        value === 'all'
                          ? undefined
                          : (value as AssetType),
                    }))
                  }
                >
                  <SelectTrigger className="h-10 w-full bg-white">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>

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
                    "
                  >
                    <SelectItem value="all">
                      All
                    </SelectItem>

                    <SelectItem value="Tyre">
                      Tyre
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ================= STATUS ================= */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Status
                </label>

                <Select
                  value={
                    localFilters.status ??
                    'all'
                  }
                  onValueChange={(value) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      status:
                        value === 'all'
                          ? undefined
                          : (value as AssetStatus),
                    }))
                  }
                >
                  <SelectTrigger className="h-10 w-full bg-white">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>

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
                    "
                  >
                    <SelectItem value="all">
                      All
                    </SelectItem>

                    <SelectItem value="Active">
                      Active
                    </SelectItem>

                    <SelectItem value="Inactive">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* ================= BRAND ================= */}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Brand
                </label>

                <Select
                  value={
                    localFilters.brand ?? 'all'
                  }
                  onValueChange={(value) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      brand:
                        value === 'all'
                          ? undefined
                          : value,
                    }))
                  }
                >
                  <SelectTrigger className="h-10 w-full bg-white">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>

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
                    "
                  >
                    <SelectItem value="all">
                      All
                    </SelectItem>

                    {brands.map((brand) => (
                      <SelectItem
                        key={brand}
                        value={brand}
                      >
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* ================= FOOTER ================= */}

            <SheetFooter className="border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
              >
                Clear
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={handleApply}
              >
                Apply
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* ================= SORT ================= */}

        <Select
          value={`${sort}-${order}`}
          onValueChange={(value) => {
            const [
              newSort,
              newOrder,
            ] = value.split('-') as [
              FleetAssetSortField,
              FleetAssetSortOrder,
            ]

            onSortChange({
              sort: newSort,
              order: newOrder,
            })
          }}
        >
          <SelectTrigger className="h-10 w-[200px] bg-white">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>

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
            "
          >
            <SelectItem value="assetName-asc">
              Asset Name A → Z
            </SelectItem>

            <SelectItem value="assetName-desc">
              Asset Name Z → A
            </SelectItem>

            <SelectItem value="createdAt-desc">
              Created Date — Newest
            </SelectItem>

            <SelectItem value="createdAt-asc">
              Created Date — Oldest
            </SelectItem>

            <SelectItem value="assetCode-asc">
              Asset Code A → Z
            </SelectItem>

            <SelectItem value="assetCode-desc">
              Asset Code Z → A
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
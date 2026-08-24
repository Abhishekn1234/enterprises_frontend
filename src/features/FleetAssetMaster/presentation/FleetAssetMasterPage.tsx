import { useState } from 'react'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useFleetAssets } from './hooks/useFleetAssets'
import { useDeleteFleetAsset } from './hooks/useDeleteFleetAsset'

import FleetAssetFilters from '@/components/FleetAssetMaster/FleetAssetFilters'
import FleetAssetTable from '@/components/FleetAssetMaster/FleetAssetTable'
import FleetAssetPagination from '@/components/FleetAssetMaster/FleetAssetPaginations'
import FleetAssetForm from '@/components/FleetAssetMaster/FleetAssetForm'
import FleetAssetView from '@/components/FleetAssetMaster/FleetAssetView'

import type {
  AssetStatus,
  AssetType,
} from '../domain/entities/FleetAsset'

type SortField =
  | 'assetName'
  | 'assetCode'
  | 'createdAt'

type SortOrder = 'asc' | 'desc'

interface FleetAssetFiltersState {
  status?: AssetStatus
  brand?: string
  assetType?: AssetType
}

export default function FleetAssetMasterPage() {
  const [search, setSearch] = useState('')

  const [filters, setFilters] =
    useState<FleetAssetFiltersState>({})

  const [sort, setSort] =
    useState<SortField>('createdAt')

  const [order, setOrder] =
    useState<SortOrder>('desc')

  const [page, setPage] = useState(1)

  const limit = 10

  const [formOpen, setFormOpen] = useState(false)

  const [viewOpen, setViewOpen] = useState(false)

  const [selectedAssetId, setSelectedAssetId] =
    useState<string | undefined>()

  const {
    data,
    isLoading,
    isFetching,
  } = useFleetAssets({
    page,
    limit,
    search,
    status: filters.status,
    brand: filters.brand,
    assetType: filters.assetType,
    sort,
    order,
  })

  const deleteMutation =
    useDeleteFleetAsset()

  const assets = data?.data ?? []

  const pagination = data?.pagination ?? {
    page: 1,
    limit,
    total: 0,
    totalPages: 0,
  }

  

  const handleAdd = () => {
    setSelectedAssetId(undefined)
    setFormOpen(true)
  }


  const handleView = (id: string) => {
    setSelectedAssetId(id)
    setViewOpen(true)
  }


  const handleEdit = (id: string) => {
    setSelectedAssetId(id)
    setFormOpen(true)
  }



  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this fleet asset?',
    )

    if (!confirmed) return

    deleteMutation.mutate(id)
  }



  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value)
    setPage(1)
  }


  const handleFilterApply = (
    values: FleetAssetFiltersState,
  ) => {
    setFilters(values)
    setPage(1)
  }

  

  const handleSortChange = (value: {
    sort: SortField
    order: SortOrder
  }) => {
    setSort(value.sort)
    setOrder(value.order)
    setPage(1)
  }

  /* ---------------- PAGE ---------------- */

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Fleet Asset Master
          </h1>

          <p className="text-muted-foreground">
            Manage tyre fleet assets and their specifications.
          </p>
        </div>

        <Button onClick={handleAdd} variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Asset
        </Button>
      </div>

      {/* Filters */}

      <FleetAssetFilters
        search={search}
        filters={filters}
        sort={sort}
        order={order}
        onSearchChange={handleSearchChange}
        onFilterApply={handleFilterApply}
        onSortChange={handleSortChange}
      />

      {/* Table */}

      <div className="rounded-lg border bg-card">
        <FleetAssetTable
          assets={assets}
          isLoading={isLoading}
          isFetching={isFetching}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}

      <FleetAssetPagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={handlePageChange}
      />

      {/* Add / Edit */}

      <FleetAssetForm
        open={formOpen}
        assetId={selectedAssetId}
        onOpenChange={setFormOpen}
      />

      {/* View */}

      <FleetAssetView
        open={viewOpen}
        assetId={selectedAssetId}
        onOpenChange={setViewOpen}
      />

    </div>
  )
}
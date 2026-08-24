import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Loader2,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { FleetAsset } from '@/features/FleetAssetMaster/domain/entities/FleetAsset'
import { formatDate } from '../common/formardate'

interface FleetAssetTableProps {
  assets: FleetAsset[]
  isLoading: boolean
  isFetching: boolean

  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function FleetAssetTable({
  assets,
  isLoading,
  isFetching,
  onView,
  onEdit,
  onDelete,
}: FleetAssetTableProps) {
  if (isLoading) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
    </div>
  )
}

  if (!assets.length) {
    return (
      <div className="p-10 text-center">
        <p className="font-medium">
          No fleet assets found
        </p>

        <p className="text-muted-foreground mt-1 text-sm">
          Try changing your search or filters.
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
            {isFetching && (
        <div className="bg-background/60 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Loader2 className="h-5 w-5 animate-spin" />
            
            </div>
        </div>
        )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Asset Code
              </TableHead>

              <TableHead>
                Asset Name
              </TableHead>

              <TableHead>
                Type
              </TableHead>

              <TableHead>
                Brand
              </TableHead>

              <TableHead>
                Model
              </TableHead>

              <TableHead>
                Status
              </TableHead>

              <TableHead>
                Created Date
              </TableHead>

              <TableHead className="w-[60px] text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {assets.map((asset) => (
              <TableRow
                key={asset._id}
                className="cursor-pointer"
                onClick={() => onView(asset._id)}
              >
                <TableCell className="font-medium">
                  {asset.assetCode}
                </TableCell>

                <TableCell>
                  {asset.assetName}
                </TableCell>

                <TableCell>
                  {asset.assetType}
                </TableCell>

                <TableCell>
                  {asset.brand}
                </TableCell>

                <TableCell>
                  {asset.model}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      asset.status === 'Active'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {asset.status}
                  </Badge>
                </TableCell>

                <TableCell>
                {formatDate(asset.createdAt)}
                </TableCell>

                <TableCell
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Asset actions"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          onView(asset._id)
                        }
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          onEdit(asset._id)
                        }
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() =>
                          onDelete(asset._id)
                        }
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
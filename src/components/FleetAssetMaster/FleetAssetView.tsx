import { Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

import { useFleetAsset } from '@/features/FleetAssetMaster/presentation/hooks/useFleetAsset'
import { DetailItem } from './DetailView'
// import { formatDate } from '../common/formardate'
// import { formatDate } from '../common/formardate'

interface FleetAssetViewProps {
  open: boolean
  assetId?: string
  onOpenChange: (open: boolean) => void
}

export default function FleetAssetView({
  open,
  assetId,
  onOpenChange,
}: FleetAssetViewProps) {
  const {
    data: asset,
    isLoading,
    isError,
  } = useFleetAsset(assetId)

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-white sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Fleet Asset
          </DialogTitle>

          <DialogDescription>
            View fleet asset details and tyre specifications.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : isError || !asset ? (
          <div className="text-muted-foreground py-10 text-center">
            Failed to load fleet asset.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Asset Header */}

            <div className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    {asset.assetCode}
                  </h2>

                  <p className="text-muted-foreground">
                    {asset.assetName}
                  </p>
                </div>

                <Badge
                  variant={
                    asset.status === 'Active'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {asset.status}
                </Badge>
              </div>
            </div>

            {/* Basic Information */}

            <section className="space-y-4">
              <div>
                <h3 className="font-semibold">
                  Basic Information
                </h3>

                <p className="text-muted-foreground text-sm">
                  General fleet asset information.
                </p>
              </div>

              <Separator />

              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem
                  label="Asset Code"
                  value={asset.assetCode}
                />

                <DetailItem
                  label="Asset Name"
                  value={asset.assetName}
                />

                <DetailItem
                  label="Asset Type"
                  value={asset.assetType}
                />

                <DetailItem
                  label="Brand"
                  value={asset.brand}
                />

                <DetailItem
                  label="Model"
                  value={asset.model}
                />

                <DetailItem
                  label="Status"
                  value={asset.status}
                />

                {asset.description && (
                  <div className="sm:col-span-2">
                    <DetailItem
                      label="Description"
                      value={asset.description}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Tyre Specifications */}

            <section className="space-y-4">
              <div>
                <h3 className="font-semibold">
                  Tyre Specifications
                </h3>

                <p className="text-muted-foreground text-sm">
                  Technical specifications of the tyre.
                </p>
              </div>

              <Separator />

              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem
                  label="Tyre Size"
                  value={
                    asset.tyreSpecifications?.tyreSize
                  }
                />

                <DetailItem
                  label="Construction"
                  value={
                    asset.tyreSpecifications?.construction
                  }
                />

                <DetailItem
                  label="Pattern"
                  value={
                    asset.tyreSpecifications?.pattern
                  }
                />

                <DetailItem
                  label="Load Index"
                  value={
                    asset.tyreSpecifications?.loadIndex
                  }
                />

                <DetailItem
                  label="Speed Rating"
                  value={
                    asset.tyreSpecifications?.speedRating
                  }
                />

                <DetailItem
                  label="Ply Rating"
                  value={
                    asset.tyreSpecifications?.plyRating
                  }
                />

                <DetailItem
                  label="Tube Type"
                  value={
                    asset.tyreSpecifications?.tubeType
                  }
                />
              </div>
            </section>

            {/* Dates */}

           
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}



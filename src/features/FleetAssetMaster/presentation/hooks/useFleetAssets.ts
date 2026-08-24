import { FleetAssetListParams } from "../../domain/entities/FleetAsset"
import { fleetAssetRepository } from "../../domain/repositories"
import { GetFleetAssets } from "../../domain/usecases/GetFleetAssets"
import { useQuery } from '@tanstack/react-query'
const getFleetAssets = new GetFleetAssets(
  fleetAssetRepository
)

export const useFleetAssets = (
  params: FleetAssetListParams
) => {
  return useQuery({
    queryKey: ['fleet-assets', params],
    queryFn: () => getFleetAssets.execute(params),
    placeholderData: (previousData) => previousData,
  })
}
import { useQuery } from "@tanstack/react-query"
import { fleetAssetRepository } from "../../domain/repositories"
import { GetFleetAssetById } from "../../domain/usecases/GetFleetAssetsById"

const getFleetAssetById =
  new GetFleetAssetById(fleetAssetRepository)

export const useFleetAsset = (
  id?: string
) => {
  return useQuery({
    queryKey: ['fleet-asset', id],
    queryFn: () =>
      getFleetAssetById.execute(id!),
    enabled: Boolean(id),
  })
}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateFleetAssetRequest } from "../../domain/entities/FleetAsset"
import { fleetAssetRepository } from "../../domain/repositories"
import { CreateFleetAsset } from "../../domain/usecases/CreateFleetAsset"

const createFleetAsset = new CreateFleetAsset(
  fleetAssetRepository
)

export const useCreateFleetAsset = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateFleetAssetRequest) =>
      createFleetAsset.execute(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fleet-assets'],
      })
    },
  })
}
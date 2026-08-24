import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fleetAssetRepository } from "../../domain/repositories"
import { UpdateFleetAsset } from "../../domain/usecases/UpdateFleetAsset"
import { UpdateFleetAssetRequest } from "../../domain/entities/FleetAsset"

const updateFleetAsset = new UpdateFleetAsset(
  fleetAssetRepository
)

export const useUpdateFleetAsset = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: UpdateFleetAssetRequest
    }) => updateFleetAsset.execute(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['fleet-assets'],
      })

      queryClient.invalidateQueries({
        queryKey: ['fleet-asset', variables.id],
      })
    },
  })
}
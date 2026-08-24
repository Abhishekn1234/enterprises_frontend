import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteFleetAsset } from "../../domain/usecases/DeleteAssets"
import { fleetAssetRepository } from "../../domain/repositories"

const deleteFleetAsset = new DeleteFleetAsset(
  fleetAssetRepository
)

export const useDeleteFleetAsset = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      deleteFleetAsset.execute(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fleet-assets'],
      })
    },
  })
}
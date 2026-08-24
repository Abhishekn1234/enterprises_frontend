import { FleetAsset, UpdateFleetAssetRequest } from "../entities/FleetAsset";
import { FleetAssetRepository } from "../repositories/FleetAssetRepository";

export class UpdateFleetAsset {
  constructor(
    private readonly repository: FleetAssetRepository
  ) {}

  execute(
    id: string,
    data: UpdateFleetAssetRequest
  ): Promise<FleetAsset> {
    return this.repository.update(id, data)
  }
}
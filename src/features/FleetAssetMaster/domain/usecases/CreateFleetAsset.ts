import { CreateFleetAssetRequest, FleetAsset } from "../entities/FleetAsset";
import { FleetAssetRepository } from "../repositories/FleetAssetRepository";

export class CreateFleetAsset {
  constructor(
    private readonly repository: FleetAssetRepository
  ) {}

  execute(
    data: CreateFleetAssetRequest
  ): Promise<FleetAsset> {
    return this.repository.create(data)
  }
}
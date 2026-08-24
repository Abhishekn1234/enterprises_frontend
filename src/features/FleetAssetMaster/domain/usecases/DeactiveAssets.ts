import { FleetAsset } from "../entities/FleetAsset";
import { FleetAssetRepository } from "../repositories/FleetAssetRepository";

export class DeactivateFleetAsset {
  constructor(
    private readonly repository: FleetAssetRepository
  ) {}

  execute(id: string): Promise<FleetAsset> {
    return this.repository.deactivate(id)
  }
}
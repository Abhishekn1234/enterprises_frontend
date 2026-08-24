import { FleetAsset } from "../entities/FleetAsset";
import { FleetAssetRepository } from "../repositories/FleetAssetRepository";

export class GetFleetAssetById {
  constructor(
    private readonly repository: FleetAssetRepository
  ) {}

  execute(id: string): Promise<FleetAsset> {
    return this.repository.getById(id)
  }
}
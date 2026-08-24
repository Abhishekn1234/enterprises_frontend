import { FleetAssetRepository } from "../repositories/FleetAssetRepository";

export class DeleteFleetAsset {
  constructor(
    private readonly repository: FleetAssetRepository
  ) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
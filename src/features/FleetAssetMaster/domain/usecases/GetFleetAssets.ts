import { FleetAssetListParams, FleetAssetListResponse } from "../entities/FleetAsset";
import { FleetAssetRepository } from "../repositories/FleetAssetRepository";

export class GetFleetAssets {
  constructor(
    private readonly repository: FleetAssetRepository
  ) {}

  execute(
    params: FleetAssetListParams
  ): Promise<FleetAssetListResponse> {
    return this.repository.getAll(params)
  }
}
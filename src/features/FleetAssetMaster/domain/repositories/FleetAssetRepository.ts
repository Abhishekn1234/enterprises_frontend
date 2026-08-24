import type {
  CreateFleetAssetRequest,
  FleetAsset,
  FleetAssetListParams,
  FleetAssetListResponse,
  UpdateFleetAssetRequest,
} from '@/features/FleetAssetMaster/domain/entities/FleetAsset'

export interface FleetAssetRepository {
  getAll(params: FleetAssetListParams): Promise<FleetAssetListResponse>

  getById(id: string): Promise<FleetAsset>

  create(data: CreateFleetAssetRequest): Promise<FleetAsset>

  update(
    id: string,
    data: UpdateFleetAssetRequest
  ): Promise<FleetAsset>

  delete(id: string): Promise<void>

  deactivate(id: string): Promise<FleetAsset>
}
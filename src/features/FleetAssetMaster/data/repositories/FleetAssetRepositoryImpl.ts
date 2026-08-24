import { CreateFleetAssetRequest, FleetAsset, FleetAssetListParams, FleetAssetListResponse, UpdateFleetAssetRequest } from "../../domain/entities/FleetAsset"
import { FleetAssetRepository } from "../../domain/repositories/FleetAssetRepository"
import { apiClient } from "../api/apiClients"

export class FleetAssetRepositoryImpl implements FleetAssetRepository {
  async getAll(
    params: FleetAssetListParams
  ): Promise<FleetAssetListResponse> {
    const response = await apiClient.get('/fleet-assets', {
      params,
    })

    return response.data
  }

  async getById(id: string): Promise<FleetAsset> {
    const response = await apiClient.get(`/fleet-assets/${id}`)

    return response.data.data
  }

  async create(
    data: CreateFleetAssetRequest
  ): Promise<FleetAsset> {
    const response = await apiClient.post('/fleet-assets', data)

    return response.data.data
  }

  async update(
    id: string,
    data: UpdateFleetAssetRequest
  ): Promise<FleetAsset> {
    const response = await apiClient.put(
      `/fleet-assets/${id}`,
      data
    )

    return response.data.data
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/fleet-assets/${id}`)
  }

  async deactivate(id: string): Promise<FleetAsset> {
    const response = await apiClient.patch(
      `/fleet-assets/${id}/deactivate`
    )

    return response.data.data
  }
}
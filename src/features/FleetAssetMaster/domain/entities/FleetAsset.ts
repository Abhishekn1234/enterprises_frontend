export type AssetType = 'Tyre'

export type AssetStatus = 'Active' | 'Inactive'

export type Construction = 'Radial' | 'Bias'

export type TubeType = 'Tubeless' | 'Tube'
export type FleetAssetSortField =
  | 'assetName'
  | 'assetCode'
  | 'createdAt'

export type FleetAssetSortOrder =
  | 'asc'
  | 'desc'
export interface FleetAssetFiltersState {
  assetType?: AssetType
  status?: AssetStatus
  brand?: string
}
export interface TyreSpecifications {
  tyreSize: string
  construction: Construction
  pattern?: string
  loadIndex?: string
  speedRating?: string
  plyRating?: string
  tubeType: TubeType
}

export interface FleetAsset {
  _id: string
  assetCode: string
  assetName: string
  assetType: AssetType
  brand: string
  model: string
  status: AssetStatus
  description?: string
  tyreSpecifications: TyreSpecifications
  createdAt: string
  updatedAt: string
}

export interface CreateFleetAssetRequest {
  assetCode: string
  assetName: string
  assetType: AssetType
  brand: string
  model: string
  status: AssetStatus
  description?: string
  tyreSpecifications: TyreSpecifications
}

export type UpdateFleetAssetRequest = CreateFleetAssetRequest

export interface FleetAssetListParams {
  page?: number
  limit?: number
  search?: string
  status?: AssetStatus
  brand?: string
  assetType?: AssetType
  sort?: 'assetName' | 'assetCode' | 'createdAt'
  order?: 'asc' | 'desc'
}

export interface FleetAssetPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface FleetAssetListResponse {
  success: boolean
  data: FleetAsset[]
  pagination: FleetAssetPagination
}
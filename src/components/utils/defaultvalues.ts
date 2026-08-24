import { FleetAssetFormValues } from "./fleetschemavalidationschema";

export const defaultValues: FleetAssetFormValues = {
  assetCode: '',
  assetName: '',
  assetType: 'Tyre',
  brand: '',
  model: '',
  status: 'Active',
  description: '',

  tyreSpecifications: {
    tyreSize: '',
    construction: 'Radial',
    pattern: '',
    loadIndex: '',
    speedRating: '',
    plyRating: '',
    tubeType: 'Tubeless',
  },
}
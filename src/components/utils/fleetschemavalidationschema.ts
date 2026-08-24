import { z } from 'zod'

export const fleetAssetSchema = z.object({
  assetCode: z
    .string()
    .min(1, 'Asset code is required'),

  assetName: z
    .string()
    .min(1, 'Asset name is required'),

  assetType: z
    .literal('Tyre'),

  brand: z
    .string()
    .min(1, 'Brand is required'),

  model: z
    .string()
    .min(1, 'Model is required'),

  status: z
    .enum(['Active', 'Inactive']),

  description: z
    .string()
    .optional(),

  tyreSpecifications: z.object({
    tyreSize: z
      .string()
      .min(1, 'Tyre size is required'),

    construction: z
      .enum(['Radial', 'Bias']),

    pattern: z
      .string()
      .optional(),

    loadIndex: z
      .string()
      .optional(),

    speedRating: z
      .string()
      .optional(),

    plyRating: z
      .string()
      .optional(),

    tubeType: z
      .enum(['Tubeless', 'Tube']),
  }),
})

export type FleetAssetFormValues =
  z.infer<typeof fleetAssetSchema>
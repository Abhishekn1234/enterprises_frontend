import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

import { useCreateFleetAsset } from '@/features/FleetAssetMaster/presentation/hooks/useCreateFleetAsset'
import { useFleetAsset } from '@/features/FleetAssetMaster/presentation/hooks/useFleetAsset'
import { useUpdateFleetAsset } from '@/features/FleetAssetMaster/presentation/hooks/useUpdateFleetAsset'

import { defaultValues } from '../utils/defaultvalues'
import {
  FleetAssetFormValues,
  fleetAssetSchema,
} from '../utils/fleetschemavalidationschema'

import {
  brands,
  constructions,
  tubeTypes,
} from '../data/values'

import { SelectField } from '../common/selectvalues'
import { TextareaField } from '../common/textareavalues'
import { TextField } from '../common/textvalues'

interface FleetAssetFormProps {
  open: boolean
  assetId?: string
  onOpenChange: (open: boolean) => void
}

export default function FleetAssetForm({
  open,
  assetId,
  onOpenChange,
}: FleetAssetFormProps) {
  const isEdit = Boolean(assetId)

  const form = useForm<FleetAssetFormValues>({
    resolver: zodResolver(fleetAssetSchema),
    defaultValues,
  })

  const createMutation = useCreateFleetAsset()
  const updateMutation = useUpdateFleetAsset()

  const {
    data: existingAsset,
    isLoading: isLoadingAsset,
  } = useFleetAsset(assetId)
  
  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending

 useEffect(() => {
  if (!open) {
    form.reset(defaultValues)
    return
  }

  if (isEdit && existingAsset) {
    console.log('========== EDIT ASSET ==========')
    console.log('existingAsset:', existingAsset)
    console.log('tyreSpecifications:', existingAsset.tyreSpecifications)

    const editValues = {
      assetCode: existingAsset.assetCode ?? '',
      assetName: existingAsset.assetName ?? '',
      assetType: existingAsset.assetType ?? 'Tyre',
      brand: existingAsset.brand ?? '',
      model: existingAsset.model ?? '',
      status: existingAsset.status ?? 'Active',
      description: existingAsset.description ?? '',

      tyreSpecifications: {
        tyreSize: existingAsset.tyreSpecifications?.tyreSize ?? '',
        construction:
          existingAsset.tyreSpecifications?.construction ?? 'Radial',
        pattern: existingAsset.tyreSpecifications?.pattern ?? '',
        loadIndex: existingAsset.tyreSpecifications?.loadIndex ?? '',
        speedRating: existingAsset.tyreSpecifications?.speedRating ?? '',
        plyRating: existingAsset.tyreSpecifications?.plyRating ?? '',
        tubeType:
          existingAsset.tyreSpecifications?.tubeType ?? 'Tubeless',
      },
    }

    console.log('FORM RESET VALUES:', editValues)

    form.reset(editValues)

    console.log('AFTER RESET:', form.getValues())
    console.log(
      'AFTER RESET TYRE:',
      form.getValues('tyreSpecifications')
    )
  }
}, [open, isEdit, existingAsset, form])

  const onSubmit = async (
    values: FleetAssetFormValues,
  ) => {
    try {
      if (isEdit && assetId) {
        await updateMutation.mutateAsync({
          id: assetId,
          data: values,
        })

        toast.success(
          'Fleet asset updated successfully',
        )
      } else {
        await createMutation.mutateAsync(values)

        toast.success(
          'Fleet asset created successfully',
        )
      }

      form.reset(defaultValues)
      onOpenChange(false)
    } catch (error: any) {
      const response = error?.response?.data

      if (response?.errors?.assetCode) {
        form.setError('assetCode', {
          type: 'server',
          message: response.errors.assetCode,
        })
      }

      toast.error(
        response?.message ||
          'Something went wrong',
      )
    }
  }

  const handleClose = () => {
    if (isSubmitting) return

    form.reset(defaultValues)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!isSubmitting) {
          onOpenChange(value)
        }
      }}
    >
      <DialogContent
        className="
          flex
          max-h-[90vh]
          min-h-0
          flex-col
          gap-0
          overflow-hidden
          bg-white
          p-0
          sm:max-w-4xl
        "
      >
        <DialogHeader
          className="
            shrink-0
            border-b
            bg-white
            px-6
            py-5
          "
        >
          <DialogTitle className="text-xl font-semibold">
            {isEdit
              ? 'Edit Fleet Asset'
              : 'Add Fleet Asset'}
          </DialogTitle>

          <DialogDescription className="mt-1">
            {isEdit
              ? 'Update the tyre asset information below.'
              : 'Enter the details to create a new tyre asset.'}
          </DialogDescription>
        </DialogHeader>

        {isEdit && isLoadingAsset ? (
          <div
            className="
              flex
              min-h-[350px]
              flex-1
              items-center
              justify-center
            "
          >
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-7 w-7 animate-spin" />

              <p className="text-muted-foreground text-sm">
                Loading asset details...
              </p>
            </div>
          </div>
        ) : (
          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
            "
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-6 py-6"
              >
                <section className="space-y-5">
                  <div>
                    <h3 className="text-base font-semibold">
                      Basic Information
                    </h3>

                    <p className="text-muted-foreground mt-1 text-sm">
                      Enter the basic fleet asset details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TextField
                      control={form.control}
                      name="assetCode"
                      label="Asset Code *"
                      placeholder="TYR-001"
                      uppercase
                    />

                    <TextField
                      control={form.control}
                      name="assetName"
                      label="Asset Name *"
                      placeholder="295/80 R22.5"
                    />

                    <SelectField
                      control={form.control}
                      name="assetType"
                      label="Asset Type *"
                      options={['Tyre']}
                    />

                    <SelectField
                      control={form.control}
                      name="brand"
                      label="Brand *"
                      options={brands}
                    />

                    <TextField
                      control={form.control}
                      name="model"
                      label="Model *"
                      placeholder="Steel Muscle"
                    />

                    <SelectField
                      control={form.control}
                      name="status"
                      label="Status *"
                      options={[
                        'Active',
                        'Inactive',
                      ]}
                    />
                  </div>

                  <TextareaField
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Enter asset description..."
                  />
                </section>

                <div className="border-t" />

                <section className="space-y-5">
                  <div>
                    <h3 className="text-base font-semibold">
                      Tyre Specifications
                    </h3>

                    <p className="text-muted-foreground mt-1 text-sm">
                      Enter the technical specifications of the tyre.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <TextField
                      control={form.control}
                      name="tyreSpecifications.tyreSize"
                      label="Tyre Size *"
                      placeholder="295/80 R22.5"
                    />

                    <SelectField
                      control={form.control}
                      name="tyreSpecifications.construction"
                      label="Construction *"
                      options={constructions}
                    />

                    <TextField
                      control={form.control}
                      name="tyreSpecifications.pattern"
                      label="Pattern"
                      placeholder="Steel Muscle"
                    />

                    <TextField
                      control={form.control}
                      name="tyreSpecifications.loadIndex"
                      label="Load Index"
                      placeholder="152"
                    />

                    <TextField
                      control={form.control}
                      name="tyreSpecifications.speedRating"
                      label="Speed Rating"
                      placeholder="M"
                    />

                    <TextField
                      control={form.control}
                      name="tyreSpecifications.plyRating"
                      label="Ply Rating"
                      placeholder="18 PR"
                    />

                    <SelectField
                      control={form.control}
                      name="tyreSpecifications.tubeType"
                      label="Tube Type *"
                      options={tubeTypes}
                    />
                  </div>
                </section>

                <div className="h-20" />
              </form>
            </Form>
          </div>
        )}

        {!isEdit || !isLoadingAsset ? (
          <div
            className="
              shrink-0
              border-t
              bg-white
              px-6
              py-4
            "
          >
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={handleClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => {
                  form.handleSubmit(onSubmit)()
                }}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {isEdit
                  ? 'Update Asset'
                  : 'Create Asset'}
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
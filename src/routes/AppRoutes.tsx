import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'

import FleetAssetMasterPage from '@/features/FleetAssetMaster/presentation/FleetAssetMasterPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/fleet-assets" replace />}
        />

        <Route
          path="/fleet-assets"
          element={<FleetAssetMasterPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/fleet-assets" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}
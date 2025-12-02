import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'

// This file can be used to centralize all routes if needed
// For now, routes are defined in App.tsx
// Additional routes will be added here as sub-pages are created

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Additional routes will be added here */}
    </Routes>
  )
}

export default AppRoutes


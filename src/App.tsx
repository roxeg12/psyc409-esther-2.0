import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import AcademicsPage from './pages/AcademicsPage'
import GradesPage from './pages/GradesPage'
import ClassesPage from './pages/ClassesPage'
import DegreePage from './pages/DegreePage'
import RegistrationPage from './pages/RegistrationPage'
import FinancesPage from './pages/FinancesPage'
import PersonalPage from './pages/PersonalPage'
import ResourcesPage from './pages/ResourcesPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/academics/grades" element={<GradesPage />} />
          <Route path="/academics/classes" element={<ClassesPage />} />
          <Route path="/academics/degree" element={<DegreePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/finances" element={<FinancesPage />} />
          <Route path="/personal" element={<PersonalPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App


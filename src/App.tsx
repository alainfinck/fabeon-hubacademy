import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { LearningProvider } from './context/LearningContext'
import { ThemeProvider } from './context/ThemeContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Catalog } from './pages/Catalog'
import { CourseDetail } from './pages/CourseDetail'
import { Lesson } from './pages/Lesson'
import { Dashboard } from './pages/Dashboard'
import { Workshops } from './pages/Workshops'
import { Events } from './pages/Events'
import { EventDetail } from './pages/EventDetail'
import { OnlineTraining } from './pages/OnlineTraining'
import { Subscription } from './pages/Subscription'
import { EnterpriseProjects } from './pages/EnterpriseProjects'
import { EnterpriseProjectSubmit } from './pages/EnterpriseProjectSubmit'
import { EnterpriseProjectDetail } from './pages/EnterpriseProjectDetail'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AuthProvider>
        <LearningProvider>
          <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="formation-en-ligne" element={<OnlineTraining />} />
            <Route path="ateliers" element={<Workshops />} />
            <Route path="evenements" element={<Events />} />
            <Route path="evenements/:slug" element={<EventDetail />} />
            <Route path="abonnement" element={<Subscription />} />
            <Route path="projets-entreprises" element={<EnterpriseProjects />} />
            <Route path="projets-entreprises/deposer" element={<EnterpriseProjectSubmit />} />
            <Route path="projets-entreprises/:id" element={<EnterpriseProjectDetail />} />
            <Route path="cours" element={<Catalog />} />
            <Route path="cours/:slug" element={<CourseDetail />} />
            <Route path="cours/:slug/lecon/:lessonId" element={<Lesson />} />
            <Route path="mon-espace" element={<Dashboard />} />
            <Route path="a-propos" element={<About />} />
            <Route path="connexion" element={<Login />} />
            <Route path="inscription" element={<Register />} />
          </Route>
        </Routes>
          </BrowserRouter>
        </LearningProvider>
        </AuthProvider>
      </DataProvider>
    </ThemeProvider>
  )
}

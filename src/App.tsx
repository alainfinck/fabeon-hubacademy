import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { About } from './pages/About'

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <LearningProvider>
          <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cours" element={<Catalog />} />
            <Route path="cours/:slug" element={<CourseDetail />} />
            <Route path="cours/:slug/lecon/:lessonId" element={<Lesson />} />
            <Route path="mon-espace" element={<Dashboard />} />
            <Route path="ateliers" element={<Workshops />} />
            <Route path="a-propos" element={<About />} />
          </Route>
        </Routes>
          </BrowserRouter>
        </LearningProvider>
      </DataProvider>
    </ThemeProvider>
  )
}

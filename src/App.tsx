import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import SettingsPage from './pages/Settings'
import ReportsPage from './pages/Reports'
import ReportBuilderPage from './pages/ReportBuilder'
import { ThemeProvider } from './components/theme-provider'
import { ReportsProvider } from './contexts/reports-context'

const App = () => (
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ReportsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/report-builder" element={<ReportBuilderPage />} />
              <Route
                path="/report-builder/:reportId"
                element={<ReportBuilderPage />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ReportsProvider>
    </ThemeProvider>
  </BrowserRouter>
)

export default App

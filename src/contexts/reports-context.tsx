import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react'
import { Report } from '@/types/report'

interface ReportsContextType {
  reports: Report[]
  addReport: (report: Omit<Report, 'id' | 'createdAt'>) => void
  updateReport: (report: Report) => void
  deleteReport: (reportId: string) => void
  getReportById: (reportId: string) => Report | undefined
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined)

const initialReports: Report[] = [
  {
    id: '1',
    name: 'Relatório de Vendas Mensal',
    createdAt: new Date().toISOString(),
    config: {
      dataSource: 'sales',
      metrics: ['totalRevenue', 'itemsSold'],
      filters: {},
      visualization: 'bar',
    },
  },
  {
    id: '2',
    name: 'Aquisição de Novos Usuários (Q3)',
    createdAt: new Date().toISOString(),
    config: {
      dataSource: 'users',
      metrics: ['newUserSignups', 'conversionRate'],
      filters: {},
      visualization: 'line',
    },
  },
]

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    const storedReports = localStorage.getItem('custom-reports')
    if (storedReports) {
      setReports(JSON.parse(storedReports))
    } else {
      setReports(initialReports)
      localStorage.setItem('custom-reports', JSON.stringify(initialReports))
    }
  }, [])

  const saveReports = (newReports: Report[]) => {
    setReports(newReports)
    localStorage.setItem('custom-reports', JSON.stringify(newReports))
  }

  const addReport = (reportData: Omit<Report, 'id' | 'createdAt'>) => {
    const newReport: Report = {
      ...reportData,
      id: new Date().getTime().toString(),
      createdAt: new Date().toISOString(),
    }
    const updatedReports = [...reports, newReport]
    saveReports(updatedReports)
  }

  const updateReport = (updatedReport: Report) => {
    const updatedReports = reports.map((report) =>
      report.id === updatedReport.id ? updatedReport : report,
    )
    saveReports(updatedReports)
  }

  const deleteReport = (reportId: string) => {
    const updatedReports = reports.filter((report) => report.id !== reportId)
    saveReports(updatedReports)
  }

  const getReportById = useCallback(
    (reportId: string) => {
      return reports.find((report) => report.id === reportId)
    },
    [reports],
  )

  return (
    <ReportsContext.Provider
      value={{ reports, addReport, updateReport, deleteReport, getReportById }}
    >
      {children}
    </ReportsContext.Provider>
  )
}

export function useReports() {
  const context = useContext(ReportsContext)
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider')
  }
  return context
}

import { DateRange } from 'react-day-picker'

export type VisualizationType = 'line' | 'bar' | 'pie' | 'table'
export type DataSource = 'sales' | 'users' | 'products'
export type Metric =
  | 'totalRevenue'
  | 'newUserSignups'
  | 'conversionRate'
  | 'itemsSold'

export type ReportConfig = {
  dataSource: DataSource
  metrics: Metric[]
  filters: {
    dateRange?: DateRange
  }
  visualization: VisualizationType
}

export type Report = {
  id: string
  name: string
  createdAt: string
  config: ReportConfig
}

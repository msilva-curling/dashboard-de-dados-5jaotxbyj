import { ReportConfig } from '@/types/report'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

type ReportPreviewProps = {
  config: Partial<ReportConfig>
}

const mockData = {
  sales: [
    { name: 'Jan', totalRevenue: 4000, itemsSold: 2400 },
    { name: 'Fev', totalRevenue: 3000, itemsSold: 1398 },
    { name: 'Mar', totalRevenue: 5000, itemsSold: 9800 },
    { name: 'Abr', totalRevenue: 4500, itemsSold: 3908 },
  ],
  users: [
    { name: 'Semana 1', newUserSignups: 120, conversionRate: 2.5 },
    { name: 'Semana 2', newUserSignups: 150, conversionRate: 3.1 },
    { name: 'Semana 3', newUserSignups: 130, conversionRate: 2.8 },
    { name: 'Semana 4', newUserSignups: 180, conversionRate: 3.5 },
  ],
  products: [
    { name: 'Produto A', itemsSold: 400 },
    { name: 'Produto B', itemsSold: 300 },
    { name: 'Produto C', itemsSold: 300 },
    { name: 'Produto D', itemsSold: 200 },
  ],
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export const ReportPreview = ({ config }: ReportPreviewProps) => {
  const data = mockData[config.dataSource ?? 'sales']
  const metric = config.metrics?.[0] ?? 'totalRevenue'

  const renderContent = () => {
    if (!config.visualization || !config.dataSource || !config.metrics) {
      return (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          <p>Configure seu relatório para ver a pré-visualização.</p>
        </div>
      )
    }

    switch (config.visualization) {
      case 'bar':
        return (
          <ChartContainer config={{}} className="h-full w-full">
            <ResponsiveContainer>
              <BarChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey={metric.toString()} fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case 'line':
        return (
          <ChartContainer config={{}} className="h-full w-full">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey={metric.toString()}
                  stroke="hsl(var(--primary))"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case 'pie':
        return (
          <ChartContainer config={{}} className="h-full w-full">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip content={<ChartTooltipContent />} />
                <Pie data={data} dataKey={metric.toString()} nameKey="name">
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case 'table':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                {config.metrics.map((m) => (
                  <TableHead key={m}>{m}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  {config.metrics?.map((m) => (
                    <TableCell key={m}>{row[m]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pré-visualização do Relatório</CardTitle>
        <CardDescription>
          Esta é uma amostra de como seu relatório será exibido.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">{renderContent()}</CardContent>
    </Card>
  )
}

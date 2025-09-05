import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const chartData = [
  { stage: 'Visitantes', value: 10000, percentage: 100 },
  { stage: 'Registrados', value: 6500, percentage: 65 },
  { stage: 'Ativos', value: 3200, percentage: 32 },
  { stage: 'Pagantes', value: 1200, percentage: 12 },
]

const chartConfig = {
  value: {
    label: 'Usuários',
    color: 'hsl(var(--chart-3))',
  },
}

export const AcquisitionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Aquisição de Usuários</CardTitle>
        <CardDescription>
          Etapas do processo de aquisição de usuários
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 10, right: 40 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis type="number" hide />
              <YAxis
                dataKey="stage"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                width={80}
              />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" radius={5}>
                <LabelList
                  dataKey="percentage"
                  position="right"
                  offset={10}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) => `${value}%`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

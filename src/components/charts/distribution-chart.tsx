import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const chartData = [
  { product: 'Produto A', sales: 45, fill: 'var(--color-productA)' },
  { product: 'Produto B', sales: 30, fill: 'var(--color-productB)' },
  { product: 'Produto C', sales: 15, fill: 'var(--color-productC)' },
  { product: 'Outros', sales: 10, fill: 'var(--color-others)' },
]

const chartConfig = {
  sales: {
    label: 'Vendas',
  },
  productA: {
    label: 'Produto A',
    color: 'hsl(var(--chart-1))',
  },
  productB: {
    label: 'Produto B',
    color: 'hsl(var(--chart-2))',
  },
  productC: {
    label: 'Produto C',
    color: 'hsl(var(--chart-3))',
  },
  others: {
    label: 'Outros',
    color: 'hsl(var(--chart-4))',
  },
}

export const DistributionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Produtos</CardTitle>
        <CardDescription>Proporção de vendas por produto</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="sales"
                nameKey="product"
                innerRadius={60}
                strokeWidth={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

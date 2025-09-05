import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp } from 'lucide-react'

type SummaryCardProps = {
  title: string
  value: string
  change: number
  icon: React.ElementType
}

export const SummaryCard = ({
  title,
  value,
  change,
  icon: Icon,
}: SummaryCardProps) => {
  const isPositive = change >= 0

  return (
    <Card className="transform-gpu transition-all duration-200 ease-out hover:scale-105 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={cn(
            'flex items-center text-xs text-muted-foreground',
            isPositive ? 'text-success' : 'text-error',
          )}
        >
          {isPositive ? (
            <ArrowUp className="mr-1 h-4 w-4" />
          ) : (
            <ArrowDown className="mr-1 h-4 w-4" />
          )}
          {Math.abs(change)}% em relação ao período anterior
        </p>
      </CardContent>
    </Card>
  )
}

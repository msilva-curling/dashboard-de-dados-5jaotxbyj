import {
  Calendar as CalendarIcon,
  DollarSign,
  Users,
  BarChart2,
  ShoppingCart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SummaryCard } from '@/components/summary-card'
import { RevenueChart } from '@/components/charts/revenue-chart'
import { SalesChart } from '@/components/charts/sales-chart'
import { AcquisitionChart } from '@/components/charts/acquisition-chart'
import { DistributionChart } from '@/components/charts/distribution-chart'
import { RecentActivityTable } from '@/components/recent-activity-table'

const Index = () => {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Dashboard Overview
        </h1>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Selecione um períodoo</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="range" numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Receita Total"
          value="R$ 45.231,89"
          change={12.5}
          icon={DollarSign}
        />
        <SummaryCard
          title="Novos Usuários"
          value="+2.350"
          change={180.1}
          icon={Users}
        />
        <SummaryCard
          title="Vendas"
          value="+12.234"
          change={-2.4}
          icon={ShoppingCart}
        />
        <SummaryCard
          title="Taxa de Conversão"
          value="2.6%"
          change={5.1}
          icon={BarChart2}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <SalesChart />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="col-span-1 lg:col-span-4">
          <AcquisitionChart />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <DistributionChart />
        </div>
      </div>
      <div>
        <RecentActivityTable />
      </div>
    </div>
  )
}

export default Index

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useReports } from '@/contexts/reports-context'
import { ReportConfig, Report } from '@/types/report'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Calendar } from '@/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ReportPreview } from '@/components/report-preview'
import { toast } from '@/components/ui/use-toast'

const reportSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
  config: z.object({
    dataSource: z.enum(['sales', 'users', 'products']),
    metrics: z.array(z.string()).min(1, 'Selecione pelo menos uma métrica.'),
    filters: z.object({
      dateRange: z.any().optional(),
    }),
    visualization: z.enum(['line', 'bar', 'pie', 'table']),
  }),
})

const allMetrics = {
  sales: [
    { value: 'totalRevenue', label: 'Receita Total' },
    { value: 'itemsSold', label: 'Itens Vendidos' },
  ],
  users: [
    { value: 'newUserSignups', label: 'Novos Usuários' },
    { value: 'conversionRate', label: 'Taxa de Conversão' },
  ],
  products: [{ value: 'itemsSold', label: 'Itens Vendidos' }],
}

const ReportBuilderPage = () => {
  const { reportId } = useParams<{ reportId: string }>()
  const navigate = useNavigate()
  const { addReport, updateReport, getReportById } = useReports()
  const [previewConfig, setPreviewConfig] = useState<Partial<ReportConfig>>({})

  const existingReport = reportId ? getReportById(reportId) : undefined

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: existingReport || {
      name: '',
      config: {
        dataSource: 'sales',
        metrics: [],
        filters: {},
        visualization: 'bar',
      },
    },
  })

  const dataSource = form.watch('config.dataSource')

  useEffect(() => {
    form.setValue('config.metrics', [])
  }, [dataSource, form])

  useEffect(() => {
    const subscription = form.watch((value) => {
      setPreviewConfig(value.config as Partial<ReportConfig>)
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = (data: z.infer<typeof reportSchema>) => {
    if (existingReport) {
      updateReport({ ...existingReport, ...data } as Report)
      toast({ title: 'Relatório atualizado com sucesso!' })
    } else {
      addReport(data)
      toast({ title: 'Relatório criado com sucesso!' })
    }
    navigate('/reports')
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {existingReport ? 'Editar Relatório' : 'Criar Novo Relatório'}
      </h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Relatório</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Vendas Trimestrais" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="config.dataSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fonte de Dados</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma fonte de dados" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sales">Vendas</SelectItem>
                      <SelectItem value="users">Usuários</SelectItem>
                      <SelectItem value="products">Produtos</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="config.metrics"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Métricas</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value?.length && 'text-muted-foreground',
                          )}
                        >
                          {field.value?.length
                            ? `${field.value.length} selecionada(s)`
                            : 'Selecione as métricas'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar métrica..." />
                        <CommandList>
                          <CommandEmpty>
                            Nenhuma métrica encontrada.
                          </CommandEmpty>
                          <CommandGroup>
                            {allMetrics[dataSource].map((metric) => (
                              <CommandItem
                                key={metric.value}
                                onSelect={() => {
                                  const currentValues = field.value || []
                                  const newValue = currentValues.includes(
                                    metric.value,
                                  )
                                    ? currentValues.filter(
                                        (v) => v !== metric.value,
                                      )
                                    : [...currentValues, metric.value]
                                  field.onChange(newValue)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    field.value?.includes(metric.value)
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {metric.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              control={form.control}
              name="config.filters.dateRange"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Período</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, 'LLL dd, y')} -{' '}
                              {format(field.value.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(field.value.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Selecione um período</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="config.visualization"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Visualização</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-4"
                    >
                      {['bar', 'line', 'pie', 'table'].map((type) => (
                        <FormItem
                          key={type}
                          className="flex items-center space-x-2 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={type} />
                          </FormControl>
                          <FormLabel className="font-normal capitalize">
                            {type === 'bar'
                              ? 'Barras'
                              : type === 'line'
                                ? 'Linhas'
                                : type === 'pie'
                                  ? 'Pizza'
                                  : 'Tabela'}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Salvar Relatório</Button>
          </form>
        </Form>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ReportPreview config={previewConfig} />
        </div>
      </div>
    </div>
  )
}

export default ReportBuilderPage

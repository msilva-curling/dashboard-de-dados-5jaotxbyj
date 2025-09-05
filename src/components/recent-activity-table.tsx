import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ArrowUpDown } from 'lucide-react'
import { Button } from './ui/button'

const activities = [
  {
    id: 'TRN001',
    date: '2024-09-05 10:30',
    description: 'Venda - Produto A',
    value: 'R$ 250,00',
    status: 'Concluído',
  },
  {
    id: 'USR001',
    date: '2024-09-05 09:45',
    description: 'Novo usuário: alice@example.com',
    value: '-',
    status: 'Registrado',
  },
  {
    id: 'TRN002',
    date: '2024-09-04 18:15',
    description: 'Venda - Produto B',
    value: 'R$ 150,00',
    status: 'Pendente',
  },
  {
    id: 'EVT001',
    date: '2024-09-04 15:00',
    description: 'Atualização do sistema',
    value: '-',
    status: 'Sucesso',
  },
  {
    id: 'TRN003',
    date: '2024-09-03 11:00',
    description: 'Venda - Produto C',
    value: 'R$ 50,00',
    status: 'Cancelado',
  },
  {
    id: 'USR002',
    date: '2024-09-03 10:00',
    description: 'Novo usuário: bob@example.com',
    value: '-',
    status: 'Registrado',
  },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Concluído':
    case 'Sucesso':
    case 'Registrado':
      return 'default'
    case 'Pendente':
      return 'secondary'
    case 'Cancelado':
      return 'destructive'
    default:
      return 'outline'
  }
}

export const RecentActivityTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
        <CardDescription>
          Acompanhe as últimas atividades na plataforma.
        </CardDescription>
        <div className="pt-4">
          <Input placeholder="Filtrar por descrição..." />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Data/Hora
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>
                <Button variant="ghost" size="sm">
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id} className="hover:bg-muted/50">
                <TableCell>{activity.date}</TableCell>
                <TableCell className="font-medium">
                  {activity.description}
                </TableCell>
                <TableCell>{activity.value}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(activity.status)}>
                    {activity.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  )
}

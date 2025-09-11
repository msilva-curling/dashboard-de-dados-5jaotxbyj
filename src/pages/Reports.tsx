import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Edit, Trash2, BarChart2 } from 'lucide-react'
import { useReports } from '@/contexts/reports-context'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const ReportsPage = () => {
  const { reports, deleteReport } = useReports()
  const [reportToDelete, setReportToDelete] = useState<string | null>(null)

  const handleDelete = () => {
    if (reportToDelete) {
      deleteReport(reportToDelete)
      setReportToDelete(null)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Meus Relatórios
        </h1>
        <Button asChild>
          <Link to="/report-builder">
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Novo Relatório
          </Link>
        </Button>
      </div>
      {reports.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed">
          <BarChart2 className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Nenhum relatório encontrado</h2>
          <p className="text-muted-foreground">
            Comece criando seu primeiro relatório personalizado.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>{report.name}</CardTitle>
                <CardDescription>
                  Criado em{' '}
                  {format(new Date(report.createdAt), "dd 'de' MMMM, yyyy", {
                    locale: ptBR,
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Fonte de Dados:</p>
                  <Badge variant="secondary">{report.config.dataSource}</Badge>
                  <p className="text-sm font-medium">Visualização:</p>
                  <Badge variant="secondary">
                    {report.config.visualization}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/report-builder/${report.id}`}>
                    <Edit className="mr-2 h-4 w-4" /> Editar
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setReportToDelete(report.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Excluir
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Você tem certeza absoluta?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso excluirá
                        permanentemente seu relatório.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setReportToDelete(null)}
                      >
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Continuar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReportsPage

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTheme } from '@/components/theme-provider'
import { toast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    .optional()
    .or(z.literal('')),
})

export default function SettingsPage() {
  const { setTheme } = useTheme()
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '',
    },
  })

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values)
    toast({
      title: 'Perfil atualizado!',
      description: 'Suas informações foram salvas com sucesso.',
    })
  }

  function onNotificationsSubmit() {
    toast({
      title: 'Preferências salvas!',
      description: 'Suas preferências de notificação foram atualizadas.',
    })
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Tema</h3>
              <p className="text-sm text-muted-foreground">
                Selecione o tema para o dashboard.
              </p>
            </div>
            <Select
              onValueChange={(value) =>
                setTheme(value as 'light' | 'dark' | 'system')
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o tema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Claro</SelectItem>
                <SelectItem value="dark">Escuro</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <h3 className="text-lg font-medium">Idioma</h3>
              <p className="text-sm text-muted-foreground">
                Selecione o idioma da interface.
              </p>
            </div>
            <Select defaultValue="pt-br">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                <SelectItem value="en-us">English (US)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
        <TabsContent value="profile" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Avatar</h3>
              <div className="flex items-center gap-4 pt-2">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://img.usecurling.com/ppl/large?gender=male&seed=1" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Input id="picture" type="file" className="max-w-xs" />
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onProfileSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Salvar Alterações</Button>
              </form>
            </Form>
          </div>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Notificações</h3>
              <p className="text-sm text-muted-foreground">
                Gerencie como você recebe notificações.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="news-sales" className="flex flex-col space-y-1">
                  <span>Novas Vendas</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Notificações por e-mail sobre novas vendas.
                  </span>
                </Label>
                <Switch id="news-sales" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label
                  htmlFor="system-updates"
                  className="flex flex-col space-y-1"
                >
                  <span>Atualizações do Sistema</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Notificações sobre atualizações e manutenções.
                  </span>
                </Label>
                <Switch id="system-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <Label htmlFor="messages" className="flex flex-col space-y-1">
                  <span>Mensagens Recebidas</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Notificações no aplicativo para novas mensagens.
                  </span>
                </Label>
                <Switch id="messages" />
              </div>
            </div>
            <Button onClick={onNotificationsSubmit}>Salvar Preferências</Button>
          </div>
        </TabsContent>
        <TabsContent value="integrations" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://img.usecurling.com/i?q=slack"
                  alt="Slack Logo"
                  className="h-8 w-8"
                />
                <p className="font-medium">Slack</p>
              </div>
              <Button variant="outline">Conectar</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <img
                  src="https://img.usecurling.com/i?q=google%20drive"
                  alt="Google Drive Logo"
                  className="h-8 w-8"
                />
                <p className="font-medium">Google Drive</p>
              </div>
              <Button variant="destructive">Desconectar</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

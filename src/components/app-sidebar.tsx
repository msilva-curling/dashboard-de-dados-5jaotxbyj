import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Home,
  LineChart,
  LogOut,
  Settings,
  BarChart,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useSidebarContext } from '@/contexts/sidebar-context'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const navItems = [
  {
    label: 'Dashboardeeee ',
    href: '/',
    icon: Home,
  },
  {
    label: 'Relatórios',
    href: '/reports',
    icon: LineChart,
  },
  {
    label: 'Configurações',
    href: '/settings',
    icon: Settings,
  },
  {
    label: 'Ajuda',
    href: '/help',
    icon: HelpCircle,
  },
]

export const AppSidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebarContext()
  const location = useLocation()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 flex h-screen flex-col bg-sidebar-bg text-sidebar-fg transition-width duration-300 ease-in-out',
        isCollapsed ? 'w-[80px]' : 'w-[250px]',
      )}
    >
      <div className="flex h-16 items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2">
          <BarChart className="h-8 w-8 text-primary" />
          {!isCollapsed && (
            <span className="text-xl font-bold text-white">Dashboard</span>
          )}
        </Link>
      </div>
      <nav className="flex-1 space-y-2 px-4 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md p-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-active-bg text-sidebar-active-fg'
                      : 'hover:bg-sidebar-hover-bg',
                    isCollapsed && 'justify-center',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          )
        })}
      </nav>
      <div className="border-t border-gray-700 p-4">
        <div
          className={cn(
            'flex items-center gap-3',
            isCollapsed && 'justify-center',
          )}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://img.usecurling.com/ppl/medium?gender=male&seed=1" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">John Doe</span>
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-sidebar-fg hover:text-white"
              >
                <LogOut className="mr-1 h-3 w-3" />
                Sair
              </Button>
            </div>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-16 h-8 w-8 rounded-full bg-sidebar-bg hover:bg-sidebar-hover-bg"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-white" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-white" />
        )}
      </Button>
    </aside>
  )
}

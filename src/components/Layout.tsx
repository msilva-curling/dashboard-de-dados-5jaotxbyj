import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SidebarProvider, useSidebarContext } from '@/contexts/sidebar-context'

const MainContent = () => {
  const { isCollapsed } = useSidebarContext()

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col bg-background transition-all duration-300 ease-in-out',
        'md:pl-[250px]',
        isCollapsed && 'md:pl-[80px]',
      )}
    >
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function Layout() {
  return (
    <SidebarProvider>
      <MainContent />
    </SidebarProvider>
  )
}

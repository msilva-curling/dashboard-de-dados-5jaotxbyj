export const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="mt-auto border-t bg-background px-4 py-3 text-center text-sm text-muted-foreground md:px-6">
      <p>
        &copy; {currentYear} Dashboard de Dados. Todos os direitos reservados.
        Versão 0.0.1
      </p>
    </footer>
  )
}

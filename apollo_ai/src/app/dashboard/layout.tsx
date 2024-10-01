export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <h1>Dashboard Header</h1>
      </header>
      <main>{children}</main>  {/* Aqui é onde o conteúdo das páginas do dashboard será renderizado */}
      <footer>
        <p>Dashboard Footer</p>
      </footer>
    </div>
  );
}
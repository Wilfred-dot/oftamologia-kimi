import { AppStateProvider, useAppState } from '@/hooks/useAppState';
import { Login } from '@/components/Login';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/components/Dashboard';
import { Pacientes } from '@/components/Pacientes';
import { Consultas } from '@/components/Consultas';
import { Exames } from '@/components/Exames';
import { Tratamentos } from '@/components/Tratamentos';
import { Relatorios } from '@/components/Relatorios';
import { Configuracoes } from '@/components/Configuracoes';
import { Toaster } from '@/components/ui/sonner';

function AppContent() {
  const { usuarioLogado, viewAtual } = useAppState();

  if (!usuarioLogado) {
    return <Login />;
  }

  const renderView = () => {
    switch (viewAtual) {
      case 'dashboard':
        return <Dashboard />;
      case 'pacientes':
        return <Pacientes />;
      case 'consultas':
        return <Consultas />;
      case 'exames':
        return <Exames />;
      case 'tratamentos':
        return <Tratamentos />;
      case 'relatorios':
        return <Relatorios />;
      case 'configuracoes':
        return <Configuracoes />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderView()}
    </Layout>
  );
}

function App() {
  return (
    <AppStateProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AppStateProvider>
  );
}

export default App;

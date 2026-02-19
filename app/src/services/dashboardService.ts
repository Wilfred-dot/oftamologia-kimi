import { api } from './api';

export interface DashboardEstatisticas {
  resumo: {
    totalPacientes: number;
    totalMedicos: number;
    totalConsultas: number;
    consultasMes: number;
    totalExames: number;
    totalTratamentos: number;
    tratamentosAtivos: number;
    consultasHoje: number;
  };
  consultasPorStatus: Array<{
    status: string;
    _count: { id: number };
  }>;
  examesPorTipo: Array<{
    tipoExame: string;
    _count: { id: number };
  }>;
  pacientesPorGenero: Array<{
    genero: string;
    _count: { id: number };
  }>;
  pacientesPorFaixaEtaria: Array<{
    faixa: string;
    quantidade: number;
  }>;
  diagnosticosFrequentes: Array<{
    diagnostico: string;
    quantidade: number;
  }>;
  proximasConsultas: Array<{
    id: string;
    pacienteNome: string;
    medicoNome: string;
    data: string;
    hora: string;
    tipo: string;
    status: string;
    paciente?: {
      id: string;
      nome: string;
      telefone: string;
    };
    medico?: {
      id: string;
      nome: string;
    };
  }>;
  consultasRecentes: Array<{
    id: string;
    pacienteNome: string;
    motivo: string;
    createdAt: string;
    paciente?: {
      id: string;
      nome: string;
    };
  }>;
}

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: string;
  data: string;
  lida: boolean;
}

export const dashboardService = {
  async estatisticas(): Promise<DashboardEstatisticas> {
    const response = await api.get('/dashboard/estatisticas');
    return response.data;
  },

  async notificacoes(): Promise<{ data: Notificacao[]; naoLidas: number }> {
    const response = await api.get('/dashboard/notificacoes');
    return response.data;
  },

  async marcarNotificacaoLida(id: string): Promise<void> {
    await api.patch(`/dashboard/notificacoes/${id}/lida`);
  },
};

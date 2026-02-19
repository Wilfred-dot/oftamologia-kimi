import { api } from './api';

export type TipoConsulta = 'PRIMEIRA_CONSULTA' | 'RETORNO' | 'EXAME' | 'CIRURGIA';
export type StatusConsulta = 'AGENDADA' | 'CONFIRMADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA';

export interface Consulta {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  medicoId: string;
  medicoNome: string;
  data: string;
  hora: string;
  tipo: TipoConsulta;
  status: StatusConsulta;
  motivo: string;
  observacoes?: string;
  createdAt: string;
  paciente?: {
    id: string;
    nome: string;
    telefone: string;
  };
  medico?: {
    id: string;
    nome: string;
    especialidade: string;
  };
}

export interface CreateConsultaData {
  pacienteId: string;
  medicoId: string;
  data: string;
  hora: string;
  tipo: TipoConsulta;
  status?: StatusConsulta;
  motivo: string;
  observacoes?: string;
}

export interface UpdateConsultaData extends Partial<CreateConsultaData> {}

export interface ConsultaListResponse {
  data: Consulta[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const consultaService = {
  async listar(page = 1, limit = 10, busca?: string, status?: StatusConsulta): Promise<ConsultaListResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (busca) params.append('busca', busca);
    if (status) params.append('status', status);
    
    const response = await api.get(`/consultas?${params.toString()}`);
    return response.data;
  },

  async buscarPorId(id: string): Promise<Consulta> {
    const response = await api.get(`/consultas/${id}`);
    return response.data.data;
  },

  async criar(data: CreateConsultaData): Promise<Consulta> {
    const response = await api.post('/consultas', data);
    return response.data.data;
  },

  async atualizar(id: string, data: UpdateConsultaData): Promise<Consulta> {
    const response = await api.put(`/consultas/${id}`, data);
    return response.data.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`/consultas/${id}`);
  },

  async proximas(): Promise<Consulta[]> {
    const response = await api.get('/consultas/proximas');
    return response.data.data;
  },

  async hoje(): Promise<Consulta[]> {
    const response = await api.get('/consultas/hoje');
    return response.data.data;
  },

  async estatisticas() {
    const response = await api.get('/consultas/estatisticas');
    return response.data;
  },
};

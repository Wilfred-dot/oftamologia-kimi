import { api } from './api';

export type TipoTratamento = 'MEDICAMENTOSO' | 'CIRURGICO' | 'FISIOTERAPICO' | 'OUTRO';
export type StatusTratamento = 'EM_ANDAMENTO' | 'CONCLUIDO' | 'CANCELADO';

export interface Medicamento {
  id: string;
  tratamentoId: string;
  nome: string;
  dosagem: string;
  frequencia: string;
  duracao: string;
}

export interface Tratamento {
  id: string;
  pacienteId: string;
  exameId?: string;
  dataInicio: string;
  dataFim?: string;
  tipo: TipoTratamento;
  descricao: string;
  instrucoes: string;
  status: StatusTratamento;
  medicamentos: Medicamento[];
  paciente?: {
    id: string;
    nome: string;
    telefone: string;
  };
  exame?: {
    id: string;
    tipoExame: string;
    diagnostico: string;
  };
}

export interface CreateMedicamentoData {
  nome: string;
  dosagem: string;
  frequencia: string;
  duracao: string;
}

export interface CreateTratamentoData {
  pacienteId: string;
  exameId?: string;
  dataInicio: string;
  dataFim?: string;
  tipo: TipoTratamento;
  descricao: string;
  instrucoes: string;
  status?: StatusTratamento;
  medicamentos?: CreateMedicamentoData[];
}

export interface UpdateTratamentoData extends Partial<CreateTratamentoData> {}

export interface TratamentoListResponse {
  data: Tratamento[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const tratamentoService = {
  async listar(page = 1, limit = 10, busca?: string, pacienteId?: string, status?: StatusTratamento): Promise<TratamentoListResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (busca) params.append('busca', busca);
    if (pacienteId) params.append('pacienteId', pacienteId);
    if (status) params.append('status', status);
    
    const response = await api.get(`/tratamentos?${params.toString()}`);
    return response.data;
  },

  async buscarPorId(id: string): Promise<Tratamento> {
    const response = await api.get(`/tratamentos/${id}`);
    return response.data.data;
  },

  async criar(data: CreateTratamentoData): Promise<Tratamento> {
    const response = await api.post('/tratamentos', data);
    return response.data.data;
  },

  async atualizar(id: string, data: UpdateTratamentoData): Promise<Tratamento> {
    const response = await api.put(`/tratamentos/${id}`, data);
    return response.data.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`/tratamentos/${id}`);
  },

  async porPaciente(pacienteId: string): Promise<Tratamento[]> {
    const response = await api.get(`/tratamentos/paciente/${pacienteId}`);
    return response.data.data;
  },

  async estatisticas() {
    const response = await api.get('/tratamentos/estatisticas');
    return response.data;
  },
};

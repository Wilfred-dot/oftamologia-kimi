import { api } from './api';

export type TipoExame = 'AV_VISUAL' | 'TONOMETRIA' | 'FUNDOSCOPIA' | 'REFRACAO' | 'OCT' | 'CAMPO_VISUAL' | 'OUTRO';

export interface OlhoData {
  avSemCorrecao?: string;
  avComCorrecao?: string;
  pressaoIntraocular?: number;
  refracao?: string;
  observacoes?: string;
}

export interface Exame {
  id: string;
  pacienteId: string;
  consultaId?: string;
  data: string;
  tipoExame: TipoExame;
  odAvSemCorrecao?: string;
  odAvComCorrecao?: string;
  odPressao?: number;
  odRefracao?: string;
  odObservacoes?: string;
  oeAvSemCorrecao?: string;
  oeAvComCorrecao?: string;
  oePressao?: number;
  oeRefracao?: string;
  oeObservacoes?: string;
  diagnostico: string;
  conduta: string;
  observacoesGerais?: string;
  paciente?: {
    id: string;
    nome: string;
    telefone: string;
  };
  consulta?: {
    id: string;
    data: string;
    hora: string;
  };
}

export interface CreateExameData {
  pacienteId: string;
  consultaId?: string;
  data: string;
  tipoExame: TipoExame;
  olhoDireito?: OlhoData;
  olhoEsquerdo?: OlhoData;
  diagnostico: string;
  conduta: string;
  observacoesGerais?: string;
}

export interface UpdateExameData extends Partial<CreateExameData> {}

export interface ExameListResponse {
  data: Exame[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const exameService = {
  async listar(page = 1, limit = 10, busca?: string, pacienteId?: string): Promise<ExameListResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (busca) params.append('busca', busca);
    if (pacienteId) params.append('pacienteId', pacienteId);
    
    const response = await api.get(`/exames?${params.toString()}`);
    return response.data;
  },

  async buscarPorId(id: string): Promise<Exame> {
    const response = await api.get(`/exames/${id}`);
    return response.data.data;
  },

  async criar(data: CreateExameData): Promise<Exame> {
    const response = await api.post('/exames', data);
    return response.data.data;
  },

  async atualizar(id: string, data: UpdateExameData): Promise<Exame> {
    const response = await api.put(`/exames/${id}`, data);
    return response.data.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`/exames/${id}`);
  },

  async porPaciente(pacienteId: string): Promise<Exame[]> {
    const response = await api.get(`/exames/paciente/${pacienteId}`);
    return response.data.data;
  },

  async estatisticas() {
    const response = await api.get('/exames/estatisticas');
    return response.data;
  },
};

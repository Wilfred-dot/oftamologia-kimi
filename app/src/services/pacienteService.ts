import { api } from './api';

export interface Paciente {
  id: string;
  nome: string;
  dataNascimento: string;
  genero: 'MASCULINO' | 'FEMININO' | 'OUTRO';
  telefone: string;
  email?: string;
  endereco: string;
  numeroBI: string;
  dataCadastro: string;
  alergias?: string;
  condicoesPreexistentes?: string;
  _count?: {
    consultas: number;
    exames: number;
    tratamentos: number;
  };
}

export interface CreatePacienteData {
  nome: string;
  dataNascimento: string;
  genero: 'MASCULINO' | 'FEMININO' | 'OUTRO';
  telefone: string;
  email?: string;
  endereco: string;
  numeroBI: string;
  alergias?: string;
  condicoesPreexistentes?: string;
}

export interface UpdatePacienteData extends Partial<CreatePacienteData> {}

export interface PacienteListResponse {
  data: Paciente[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const pacienteService = {
  async listar(page = 1, limit = 10, busca?: string): Promise<PacienteListResponse> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (busca) params.append('busca', busca);
    
    const response = await api.get(`/pacientes?${params.toString()}`);
    return response.data;
  },

  async buscarPorId(id: string): Promise<Paciente> {
    const response = await api.get(`/pacientes/${id}`);
    return response.data.data;
  },

  async criar(data: CreatePacienteData): Promise<Paciente> {
    const response = await api.post('/pacientes', data);
    return response.data.data;
  },

  async atualizar(id: string, data: UpdatePacienteData): Promise<Paciente> {
    const response = await api.put(`/pacientes/${id}`, data);
    return response.data.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`/pacientes/${id}`);
  },

  async estatisticas() {
    const response = await api.get('/pacientes/estatisticas');
    return response.data;
  },
};

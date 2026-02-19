import { api } from './api';

export interface HorarioTrabalho {
  id: string;
  dia: string;
  inicio: string;
  fim: string;
}

export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  telefone: string;
  email: string;
  horarios: HorarioTrabalho[];
  _count?: {
    consultas: number;
  };
}

export interface CreateHorarioData {
  dia: string;
  inicio: string;
  fim: string;
}

export interface CreateMedicoData {
  nome: string;
  especialidade: string;
  crm: string;
  telefone: string;
  email: string;
  horarios?: CreateHorarioData[];
}

export interface UpdateMedicoData extends Partial<CreateMedicoData> {}

export const medicoService = {
  async listar(): Promise<Medico[]> {
    const response = await api.get('/medicos');
    return response.data.data;
  },

  async buscarPorId(id: string): Promise<Medico> {
    const response = await api.get(`/medicos/${id}`);
    return response.data.data;
  },

  async criar(data: CreateMedicoData): Promise<Medico> {
    const response = await api.post('/medicos', data);
    return response.data.data;
  },

  async atualizar(id: string, data: UpdateMedicoData): Promise<Medico> {
    const response = await api.put(`/medicos/${id}`, data);
    return response.data.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`/medicos/${id}`);
  },
};

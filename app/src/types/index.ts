// Tipos para o Sistema de Gestão de Saúde Oftalmológica

export interface Paciente {
  id: string;
  nome: string;
  dataNascimento: string;
  genero: 'masculino' | 'feminino' | 'outro';
  telefone: string;
  email?: string;
  endereco: string;
  numeroBI: string;
  dataCadastro: string;
  alergias?: string;
  condicoesPreexistentes?: string;
}

export interface Medico {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  telefone: string;
  email: string;
  horarioTrabalho: {
    dia: string;
    inicio: string;
    fim: string;
  }[];
}

export interface Consulta {
  id: string;
  pacienteId: string;
  pacienteNome: string;
  medicoId: string;
  medicoNome: string;
  data: string;
  hora: string;
  tipo: 'primeira_consulta' | 'retorno' | 'exame' | 'cirurgia';
  status: 'agendada' | 'confirmada' | 'em_andamento' | 'concluida' | 'cancelada';
  motivo: string;
  observacoes?: string;
  createdAt: string;
}

export interface ExameOftalmologico {
  id: string;
  pacienteId: string;
  consultaId: string;
  data: string;
  tipoExame: 'av_visual' | 'tonometria' | 'fundoscopia' | 'refracao' | 'oct' | 'campo_visual' | 'outro';
  olhoDireito: {
    avSemCorrecao?: string;
    avComCorrecao?: string;
    pressaoIntraocular?: number;
    refracao?: string;
    observacoes?: string;
  };
  olhoEsquerdo: {
    avSemCorrecao?: string;
    avComCorrecao?: string;
    pressaoIntraocular?: number;
    refracao?: string;
    observacoes?: string;
  };
  diagnostico: string;
  conduta: string;
  anexos?: string[];
  observacoesGerais?: string;
}

export interface Tratamento {
  id: string;
  pacienteId: string;
  exameId: string;
  dataInicio: string;
  dataFim?: string;
  tipo: 'medicamentoso' | 'cirurgico' | 'fisioterapico' | 'outro';
  descricao: string;
  medicamentos?: {
    nome: string;
    dosagem: string;
    frequencia: string;
    duracao: string;
  }[];
  instrucoes: string;
  status: 'em_andamento' | 'concluido' | 'cancelado';
}

export interface HistoricoClinico {
  id: string;
  pacienteId: string;
  entradas: EntradaHistorico[];
}

export interface EntradaHistorico {
  id: string;
  data: string;
  tipo: 'consulta' | 'exame' | 'tratamento' | 'observacao';
  descricao: string;
  profissional: string;
  anexos?: string[];
}

export interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'consulta' | 'exame' | 'tratamento' | 'sistema';
  data: string;
  lida: boolean;
  destinatarioId: string;
}

export interface RelatorioEstatisticas {
  totalPacientes: number;
  totalConsultasMes: number;
  consultasPorStatus: {
    agendada: number;
    confirmada: number;
    em_andamento: number;
    concluida: number;
    cancelada: number;
  };
  examesPorTipo: {
    [key: string]: number;
  };
  diagnosticosFrequentes: {
    diagnostico: string;
    quantidade: number;
  }[];
  pacientesPorFaixaEtaria: {
    faixa: string;
    quantidade: number;
  }[];
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: 'admin' | 'medico' | 'recepcionista' | 'tecnico';
  ativo: boolean;
  ultimoAcesso?: string;
}

export type ViewType = 
  | 'dashboard' 
  | 'pacientes' 
  | 'consultas' 
  | 'exames' 
  | 'tratamentos' 
  | 'relatorios' 
  | 'configuracoes';

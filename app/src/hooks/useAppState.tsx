import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { 
  authService, 
  pacienteService, 
  consultaService, 
  exameService, 
  tratamentoService, 
  medicoService,
  dashboardService,
  type Paciente,
  type Consulta,
  type Exame,
  type Tratamento,
  type Medico,
  type DashboardEstatisticas,
  type LoginCredentials,
  type CreateConsultaData,
  type CreateTratamentoData,
  type CreateExameData,
} from '@/services';
import { toast } from 'sonner';

export type ViewType = 
  | 'dashboard' 
  | 'pacientes' 
  | 'consultas' 
  | 'exames' 
  | 'tratamentos' 
  | 'relatorios' 
  | 'configuracoes';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: 'ADMIN' | 'MEDICO' | 'RECEPCIONISTA' | 'TECNICO';
}

interface AppStateContextType {
  // Dados
  pacientes: Paciente[];
  medicos: Medico[];
  consultas: Consulta[];
  exames: Exame[];
  tratamentos: Tratamento[];
  estatisticas: DashboardEstatisticas | null;
  
  // Estado da UI
  viewAtual: ViewType;
  usuarioLogado: Usuario | null;
  isLoading: boolean;
  
  // Ações
  setViewAtual: (view: ViewType) => void;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  
  // CRUD Pacientes
  carregarPacientes: (page?: number, limit?: number, busca?: string) => Promise<void>;
  adicionarPaciente: (paciente: Omit<Paciente, 'id' | 'dataCadastro'>) => Promise<void>;
  atualizarPaciente: (id: string, paciente: Partial<Paciente>) => Promise<void>;
  removerPaciente: (id: string) => Promise<void>;
  
  // CRUD Consultas
  carregarConsultas: (page?: number, limit?: number, busca?: string, status?: string) => Promise<void>;
  adicionarConsulta: (consulta: CreateConsultaData) => Promise<void>;
  atualizarConsulta: (id: string, consulta: Partial<Consulta>) => Promise<void>;
  removerConsulta: (id: string) => Promise<void>;
  
  // CRUD Exames
  carregarExames: (page?: number, limit?: number, busca?: string) => Promise<void>;
  adicionarExame: (exame: CreateExameData) => Promise<void>;
  
  // CRUD Tratamentos
  carregarTratamentos: (page?: number, limit?: number, busca?: string) => Promise<void>;
  adicionarTratamento: (tratamento: CreateTratamentoData) => Promise<void>;
  
  // Dashboard
  carregarEstatisticas: () => Promise<void>;
  
  // Médicos
  carregarMedicos: () => Promise<void>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  // Dados
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [exames, setExames] = useState<Exame[]>([]);
  const [tratamentos, setTratamentos] = useState<Tratamento[]>([]);
  const [estatisticas, setEstatisticas] = useState<DashboardEstatisticas | null>(null);
  
  // Estado da UI
  const [viewAtual, setViewAtual] = useState<ViewType>('dashboard');
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar sessão ao iniciar
  useEffect(() => {
    const token = authService.getToken();
    const user = authService.getUser();
    if (token && user) {
      setUsuarioLogado(user);
    }
  }, []);

  // Login/Logout
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await authService.login(credentials);
      authService.setToken(response.token);
      authService.setUser(response.user);
      setUsuarioLogado(response.user as Usuario);
      toast.success('Login realizado com sucesso!');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao fazer login');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.removeToken();
    authService.removeUser();
    setUsuarioLogado(null);
    setViewAtual('dashboard');
    toast.info('Sessão encerrada');
  }, []);

  // Médicos
  const carregarMedicos = useCallback(async () => {
    try {
      const data = await medicoService.listar();
      setMedicos(data);
    } catch (error: any) {
      toast.error('Erro ao carregar médicos');
    }
  }, []);

  // CRUD Pacientes
  const carregarPacientes = useCallback(async (page = 1, limit = 10, busca?: string) => {
    try {
      setIsLoading(true);
      const response = await pacienteService.listar(page, limit, busca);
      setPacientes(response.data);
    } catch (error: any) {
      toast.error('Erro ao carregar pacientes');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const adicionarPaciente = useCallback(async (paciente: Omit<Paciente, 'id' | 'dataCadastro'>) => {
    try {
      setIsLoading(true);
      await pacienteService.criar(paciente);
      await carregarPacientes();
      toast.success('Paciente cadastrado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao cadastrar paciente');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [carregarPacientes]);

  const atualizarPaciente = useCallback(async (id: string, dados: Partial<Paciente>) => {
    try {
      setIsLoading(true);
      await pacienteService.atualizar(id, dados);
      await carregarPacientes();
      toast.success('Paciente atualizado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao atualizar paciente');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [carregarPacientes]);

  const removerPaciente = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await pacienteService.excluir(id);
      await carregarPacientes();
      toast.success('Paciente excluído com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao excluir paciente');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [carregarPacientes]);

  // CRUD Consultas
  const carregarConsultas = useCallback(async (page = 1, limit = 10, busca?: string, status?: string) => {
    try {
      setIsLoading(true);
      const response = await consultaService.listar(page, limit, busca, status as any);
      setConsultas(response.data);
    } catch (error: any) {
      toast.error('Erro ao carregar consultas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const adicionarConsulta = useCallback(async (consulta: CreateConsultaData) => {
    try {
      setIsLoading(true);
      await consultaService.criar(consulta);
      await carregarConsultas();
      toast.success('Consulta agendada com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao agendar consulta');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [carregarConsultas]);

  const atualizarConsulta = useCallback(async (id: string, dados: Partial<Consulta>) => {
    try {
      setIsLoading(true);
      await consultaService.atualizar(id, dados);
      await carregarConsultas();
      toast.success('Consulta atualizada com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao atualizar consulta');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [carregarConsultas]);

  const removerConsulta = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await consultaService.excluir(id);
      await carregarConsultas();
      toast.success('Consulta excluída com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao excluir consulta');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [carregarConsultas]);

  // CRUD Exames
  const carregarExames = useCallback(async (page = 1, limit = 10, busca?: string) => {
    try {
      setIsLoading(true);
      const response = await exameService.listar(page, limit, busca);
      setExames(response.data);
    } catch (error: any) {
      toast.error('Erro ao carregar exames');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const adicionarExame = useCallback(async (exame: CreateExameData) => {
    try {
      setIsLoading(true);
      await exameService.criar(exame);
      await carregarExames();
      toast.success('Exame registrado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao registrar exame');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [carregarExames]);

  // CRUD Tratamentos
  const carregarTratamentos = useCallback(async (page = 1, limit = 10, busca?: string) => {
    try {
      setIsLoading(true);
      const response = await tratamentoService.listar(page, limit, busca);
      setTratamentos(response.data);
    } catch (error: any) {
      toast.error('Erro ao carregar tratamentos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const adicionarTratamento = useCallback(async (tratamento: CreateTratamentoData) => {
    try {
      setIsLoading(true);
      await tratamentoService.criar(tratamento);
      await carregarTratamentos();
      toast.success('Tratamento registrado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao registrar tratamento');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [carregarTratamentos]);

  // Dashboard
  const carregarEstatisticas = useCallback(async () => {
    try {
      const data = await dashboardService.estatisticas();
      setEstatisticas(data);
    } catch (error: any) {
      toast.error('Erro ao carregar estatísticas');
    }
  }, []);

  const value: AppStateContextType = {
    pacientes,
    medicos,
    consultas,
    exames,
    tratamentos,
    estatisticas,
    viewAtual,
    usuarioLogado,
    isLoading,
    setViewAtual,
    login,
    logout,
    carregarPacientes,
    adicionarPaciente,
    atualizarPaciente,
    removerPaciente,
    carregarConsultas,
    adicionarConsulta,
    atualizarConsulta,
    removerConsulta,
    carregarExames,
    adicionarExame,
    carregarTratamentos,
    adicionarTratamento,
    carregarEstatisticas,
    carregarMedicos,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState deve ser usado dentro de um AppStateProvider');
  }
  return context;
}

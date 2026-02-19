export { api } from './api';
export { authService, type LoginCredentials, type LoginResponse } from './authService';
export { pacienteService, type Paciente, type CreatePacienteData } from './pacienteService';
export { consultaService, type Consulta, type CreateConsultaData, type StatusConsulta, type TipoConsulta } from './consultaService';
export { exameService, type Exame, type CreateExameData, type TipoExame } from './exameService';
export { tratamentoService, type Tratamento, type CreateTratamentoData, type TipoTratamento, type StatusTratamento, type CreateMedicamentoData } from './tratamentoService';
export { medicoService, type Medico } from './medicoService';
export { dashboardService, type DashboardEstatisticas } from './dashboardService';

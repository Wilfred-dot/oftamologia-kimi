import type { Paciente, Medico, Consulta, ExameOftalmologico, Tratamento, Notificacao, Usuario, RelatorioEstatisticas } from '@/types';

export const pacientesMock: Paciente[] = [
  {
    id: '1',
    nome: 'Maria da Conceição',
    dataNascimento: '1985-03-15',
    genero: 'feminino',
    telefone: '+258 84 123 4567',
    email: 'maria.conceicao@email.com',
    endereco: 'Bairro Esturro, Rua 123, Casa 45',
    numeroBI: '110123456789',
    dataCadastro: '2024-01-10',
    alergias: 'Alergia a penicilina',
    condicoesPreexistentes: 'Diabetes tipo 2'
  },
  {
    id: '2',
    nome: 'João Carlos Matusse',
    dataNascimento: '1978-07-22',
    genero: 'masculino',
    telefone: '+258 86 987 6543',
    email: 'joao.matusse@email.com',
    endereco: 'Bairro Munhava, Avenida Principal, Casa 78',
    numeroBI: '110987654321',
    dataCadastro: '2024-02-05',
    alergias: '',
    condicoesPreexistentes: 'Hipertensão'
  },
  {
    id: '3',
    nome: 'Ana Lucia Fernando',
    dataNascimento: '1992-11-08',
    genero: 'feminino',
    telefone: '+258 87 456 7890',
    email: 'ana.fernando@email.com',
    endereco: 'Bairro Chipangara, Rua das Flores, Casa 12',
    numeroBI: '110456789012',
    dataCadastro: '2024-03-12',
    alergias: '',
    condicoesPreexistentes: ''
  },
  {
    id: '4',
    nome: 'Pedro António Saide',
    dataNascimento: '1965-05-30',
    genero: 'masculino',
    telefone: '+258 82 234 5678',
    email: 'pedro.saide@email.com',
    endereco: 'Bairro Ponta-Gêa, Rua do Comércio, Casa 89',
    numeroBI: '110234567890',
    dataCadastro: '2024-01-25',
    alergias: 'Alergia a sulfas',
    condicoesPreexistentes: 'Glaucoma'
  },
  {
    id: '5',
    nome: 'Fátima Omar',
    dataNascimento: '2001-09-18',
    genero: 'feminino',
    telefone: '+258 85 876 5432',
    email: 'fatima.omar@email.com',
    endereco: 'Bairro Manga, Rua 7, Casa 34',
    numeroBI: '110876543210',
    dataCadastro: '2024-04-01',
    alergias: '',
    condicoesPreexistentes: ''
  },
  {
    id: '6',
    nome: 'Carlos Manuel João',
    dataNascimento: '1958-12-03',
    genero: 'masculino',
    telefone: '+258 83 345 6789',
    email: 'carlos.joao@email.com',
    endereco: 'Bairro Chota, Avenida dos Heróis, Casa 56',
    numeroBI: '110345678901',
    dataCadastro: '2024-02-18',
    alergias: '',
    condicoesPreexistentes: 'Catarata, Diabetes'
  },
  {
    id: '7',
    nome: 'Lucia Matilde',
    dataNascimento: '1988-04-25',
    genero: 'feminino',
    telefone: '+258 84 567 8901',
    email: 'lucia.matilde@email.com',
    endereco: 'Bairro Macuti, Rua da Praia, Casa 23',
    numeroBI: '110567890123',
    dataCadastro: '2024-03-20',
    alergias: 'Alergia a látex',
    condicoesPreexistentes: ''
  },
  {
    id: '8',
    nome: 'Moussa Abdul',
    dataNascimento: '1972-08-14',
    genero: 'masculino',
    telefone: '+258 86 678 9012',
    email: 'moussa.abdul@email.com',
    endereco: 'Bairro Nhaconjo, Rua 15, Casa 67',
    numeroBI: '110678901234',
    dataCadastro: '2024-01-30',
    alergias: '',
    condicoesPreexistentes: 'Degeneração macular'
  }
];

export const medicosMock: Medico[] = [
  {
    id: '1',
    nome: 'Dr. Persson Domingos Abrantes',
    especialidade: 'Oftalmologista',
    crm: 'MOC-1234',
    telefone: '+258 84 111 2222',
    email: 'persson.abrantes@clinica.co.mz',
    horarioTrabalho: [
      { dia: 'Segunda', inicio: '08:00', fim: '17:00' },
      { dia: 'Terça', inicio: '08:00', fim: '17:00' },
      { dia: 'Quarta', inicio: '08:00', fim: '17:00' },
      { dia: 'Quinta', inicio: '08:00', fim: '17:00' },
      { dia: 'Sexta', inicio: '08:00', fim: '16:00' }
    ]
  },
  {
    id: '2',
    nome: 'Dra. Ana Paula Silva',
    especialidade: 'Oftalmologista Pediátrica',
    crm: 'MOC-5678',
    telefone: '+258 86 333 4444',
    email: 'ana.silva@clinica.co.mz',
    horarioTrabalho: [
      { dia: 'Segunda', inicio: '09:00', fim: '18:00' },
      { dia: 'Terça', inicio: '09:00', fim: '18:00' },
      { dia: 'Quarta', inicio: '09:00', fim: '18:00' },
      { dia: 'Quinta', inicio: '09:00', fim: '18:00' },
      { dia: 'Sexta', inicio: '09:00', fim: '15:00' }
    ]
  },
  {
    id: '3',
    nome: 'Dr. Carlos Eduardo',
    especialidade: 'Cirurgião Oftalmológico',
    crm: 'MOC-9012',
    telefone: '+258 87 555 6666',
    email: 'carlos.eduardo@clinica.co.mz',
    horarioTrabalho: [
      { dia: 'Segunda', inicio: '07:00', fim: '16:00' },
      { dia: 'Terça', inicio: '07:00', fim: '16:00' },
      { dia: 'Quarta', inicio: '07:00', fim: '16:00' },
      { dia: 'Quinta', inicio: '07:00', fim: '16:00' }
    ]
  }
];

export const consultasMock: Consulta[] = [
  {
    id: '1',
    pacienteId: '1',
    pacienteNome: 'Maria da Conceição',
    medicoId: '1',
    medicoNome: 'Dr. Persson Domingos Abrantes',
    data: '2025-02-20',
    hora: '09:00',
    tipo: 'primeira_consulta',
    status: 'confirmada',
    motivo: 'Dor nos olhos e visão embaçada',
    observacoes: 'Paciente refere sintomas há 2 semanas',
    createdAt: '2025-02-15'
  },
  {
    id: '2',
    pacienteId: '2',
    pacienteNome: 'João Carlos Matusse',
    medicoId: '1',
    medicoNome: 'Dr. Persson Domingos Abrantes',
    data: '2025-02-20',
    hora: '10:30',
    tipo: 'retorno',
    status: 'agendada',
    motivo: 'Acompanhamento de hipertensão ocular',
    observacoes: '',
    createdAt: '2025-02-16'
  },
  {
    id: '3',
    pacienteId: '3',
    pacienteNome: 'Ana Lucia Fernando',
    medicoId: '2',
    medicoNome: 'Dra. Ana Paula Silva',
    data: '2025-02-21',
    hora: '14:00',
    tipo: 'exame',
    status: 'agendada',
    motivo: 'Exame de rotina',
    observacoes: '',
    createdAt: '2025-02-17'
  },
  {
    id: '4',
    pacienteId: '4',
    pacienteNome: 'Pedro António Saide',
    medicoId: '1',
    medicoNome: 'Dr. Persson Domingos Abrantes',
    data: '2025-02-19',
    hora: '11:00',
    tipo: 'retorno',
    status: 'concluida',
    motivo: 'Controle de glaucoma',
    observacoes: 'Pressão intraocular controlada',
    createdAt: '2025-02-10'
  },
  {
    id: '5',
    pacienteId: '5',
    pacienteNome: 'Fátima Omar',
    medicoId: '2',
    medicoNome: 'Dra. Ana Paula Silva',
    data: '2025-02-22',
    hora: '09:30',
    tipo: 'primeira_consulta',
    status: 'agendada',
    motivo: 'Dificuldade para enxergar de longe',
    observacoes: '',
    createdAt: '2025-02-18'
  },
  {
    id: '6',
    pacienteId: '6',
    pacienteNome: 'Carlos Manuel João',
    medicoId: '3',
    medicoNome: 'Dr. Carlos Eduardo',
    data: '2025-02-18',
    hora: '08:00',
    tipo: 'cirurgia',
    status: 'concluida',
    motivo: 'Cirurgia de catarata',
    observacoes: 'Procedimento realizado com sucesso',
    createdAt: '2025-02-01'
  },
  {
    id: '7',
    pacienteId: '7',
    pacienteNome: 'Lucia Matilde',
    medicoId: '1',
    medicoNome: 'Dr. Persson Domingos Abrantes',
    data: '2025-02-25',
    hora: '15:00',
    tipo: 'exame',
    status: 'agendada',
    motivo: 'Tonometria e fundoscopia',
    observacoes: '',
    createdAt: '2025-02-19'
  },
  {
    id: '8',
    pacienteId: '8',
    pacienteNome: 'Moussa Abdul',
    medicoId: '1',
    medicoNome: 'Dr. Persson Domingos Abrantes',
    data: '2025-02-19',
    hora: '16:30',
    tipo: 'retorno',
    status: 'em_andamento',
    motivo: 'Acompanhamento de degeneração macular',
    observacoes: '',
    createdAt: '2025-02-12'
  }
];

export const examesMock: ExameOftalmologico[] = [
  {
    id: '1',
    pacienteId: '1',
    consultaId: '1',
    data: '2025-02-20',
    tipoExame: 'av_visual',
    olhoDireito: {
      avSemCorrecao: '20/80',
      avComCorrecao: '20/25',
      observacoes: 'Astigmatismo leve'
    },
    olhoEsquerdo: {
      avSemCorrecao: '20/60',
      avComCorrecao: '20/20',
      observacoes: ''
    },
    diagnostico: 'Miopia e astigmatismo',
    conduta: 'Prescrição de óculos de grau',
    observacoesGerais: 'Paciente deve retornar em 6 meses'
  },
  {
    id: '2',
    pacienteId: '4',
    consultaId: '4',
    data: '2025-02-19',
    tipoExame: 'tonometria',
    olhoDireito: {
      pressaoIntraocular: 16,
      observacoes: 'Pressão normal'
    },
    olhoEsquerdo: {
      pressaoIntraocular: 18,
      observacoes: 'Pressão normal'
    },
    diagnostico: 'Glaucoma controlado',
    conduta: 'Manter medicamento atual',
    observacoesGerais: 'Controle a cada 3 meses'
  },
  {
    id: '3',
    pacienteId: '6',
    consultaId: '6',
    data: '2025-02-18',
    tipoExame: 'fundoscopia',
    olhoDireito: {
      observacoes: 'Catarata madura'
    },
    olhoEsquerdo: {
      observacoes: 'Catarata incipiente'
    },
    diagnostico: 'Catarata OD madura, OE incipiente',
    conduta: 'Cirurgia de facoemulsificação OD realizada',
    observacoesGerais: 'Cirurgia realizada com sucesso. Retorno em 1 semana.'
  }
];

export const tratamentosMock: Tratamento[] = [
  {
    id: '1',
    pacienteId: '1',
    exameId: '1',
    dataInicio: '2025-02-20',
    tipo: 'medicamentoso',
    descricao: 'Tratamento para olho seco',
    medicamentos: [
      {
        nome: 'Colírio Lubrificante',
        dosagem: '1 gota',
        frequencia: '4x ao dia',
        duracao: '30 dias'
      }
    ],
    instrucoes: 'Aplicar colírio a cada 6 horas',
    status: 'em_andamento'
  },
  {
    id: '2',
    pacienteId: '4',
    exameId: '2',
    dataInicio: '2024-06-15',
    tipo: 'medicamentoso',
    descricao: 'Tratamento de glaucoma',
    medicamentos: [
      {
        nome: 'Timolol',
        dosagem: '1 gota',
        frequencia: '2x ao dia',
        duracao: 'Contínuo'
      },
      {
        nome: 'Latanoprosta',
        dosagem: '1 gota',
        frequencia: '1x ao dia (noite)',
        duracao: 'Contínuo'
      }
    ],
    instrucoes: 'Nunca parar o medicamento sem orientação médica',
    status: 'em_andamento'
  },
  {
    id: '3',
    pacienteId: '6',
    exameId: '3',
    dataInicio: '2025-02-18',
    dataFim: '2025-02-18',
    tipo: 'cirurgico',
    descricao: 'Cirurgia de catarata OD',
    instrucoes: 'Usar colírio antibiótico por 7 dias. Evitar esforço físico por 2 semanas.',
    status: 'concluido'
  }
];

export const notificacoesMock: Notificacao[] = [
  {
    id: '1',
    titulo: 'Consulta Confirmada',
    mensagem: 'Sua consulta com Dr. Persson foi confirmada para 20/02/2025 às 09:00',
    tipo: 'consulta',
    data: '2025-02-15',
    lida: false,
    destinatarioId: '1'
  },
  {
    id: '2',
    titulo: 'Lembrete de Consulta',
    mensagem: 'Lembrete: Você tem uma consulta amanhã às 10:30',
    tipo: 'consulta',
    data: '2025-02-19',
    lida: true,
    destinatarioId: '2'
  },
  {
    id: '3',
    titulo: 'Resultado de Exame',
    mensagem: 'Seu exame de tonometria está disponível. Pressão intraocular normal.',
    tipo: 'exame',
    data: '2025-02-19',
    lida: false,
    destinatarioId: '4'
  },
  {
    id: '4',
    titulo: 'Novo Agendamento',
    mensagem: 'Nova consulta agendada para 22/02/2025',
    tipo: 'consulta',
    data: '2025-02-18',
    lida: false,
    destinatarioId: '5'
  }
];

export const usuariosMock: Usuario[] = [
  {
    id: '1',
    nome: 'Administrador',
    email: 'admin@sistema.co.mz',
    perfil: 'admin',
    ativo: true,
    ultimoAcesso: '2025-02-19'
  },
  {
    id: '2',
    nome: 'Dr. Persson Domingos Abrantes',
    email: 'persson@clinica.co.mz',
    perfil: 'medico',
    ativo: true,
    ultimoAcesso: '2025-02-19'
  },
  {
    id: '3',
    nome: 'Recepcionista',
    email: 'recepcao@clinica.co.mz',
    perfil: 'recepcionista',
    ativo: true,
    ultimoAcesso: '2025-02-18'
  }
];

export const estatisticasMock: RelatorioEstatisticas = {
  totalPacientes: 156,
  totalConsultasMes: 89,
  consultasPorStatus: {
    agendada: 23,
    confirmada: 18,
    em_andamento: 5,
    concluida: 38,
    cancelada: 5
  },
  examesPorTipo: {
    av_visual: 32,
    tonometria: 18,
    fundoscopia: 15,
    refracao: 12,
    oct: 8,
    campo_visual: 4
  },
  diagnosticosFrequentes: [
    { diagnostico: 'Miopia', quantidade: 28 },
    { diagnostico: 'Hipermetropia', quantidade: 22 },
    { diagnostico: 'Astigmatismo', quantidade: 19 },
    { diagnostico: 'Catarata', quantidade: 12 },
    { diagnostico: 'Glaucoma', quantidade: 8 }
  ],
  pacientesPorFaixaEtaria: [
    { faixa: '0-18', quantidade: 23 },
    { faixa: '19-35', quantidade: 45 },
    { faixa: '36-50', quantidade: 38 },
    { faixa: '51-65', quantidade: 32 },
    { faixa: '65+', quantidade: 18 }
  ]
};

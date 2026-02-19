import { useEffect } from 'react';
import { 
  Download, 
  FileText, 
  TrendingUp, 
  Users,
  Calendar,
  Eye,
  Pill,
  BarChart3,
  Activity,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppState } from '@/hooks/useAppState';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const COLORS = ['#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'];

export function Relatorios() {
  const { 
    estatisticas, 
    carregarEstatisticas, 
    isLoading 
  } = useAppState();

  useEffect(() => {
    carregarEstatisticas();
  }, [carregarEstatisticas]);

  if (isLoading || !estatisticas) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  const { resumo, consultasPorStatus, examesPorTipo, diagnosticosFrequentes, pacientesPorFaixaEtaria } = estatisticas;

  // Dados para gráficos
  const dadosConsultasStatus = consultasPorStatus.map((item) => ({
    name: item.status.replace('_', ' '),
    value: item._count.id,
    color: 
      item.status === 'AGENDADA' ? '#f59e0b' :
      item.status === 'CONFIRMADA' ? '#3b82f6' :
      item.status === 'EM_ANDAMENTO' ? '#8b5cf6' :
      item.status === 'CONCLUIDA' ? '#10b981' : '#ef4444',
  }));

  const dadosDiagnosticos = diagnosticosFrequentes.map((d, i) => ({
    name: d.diagnostico,
    quantidade: d.quantidade,
    color: COLORS[i % COLORS.length]
  }));

  const dadosFaixaEtaria = pacientesPorFaixaEtaria.map((f, i) => ({
    name: f.faixa,
    quantidade: f.quantidade,
    color: COLORS[i % COLORS.length]
  }));

  const dadosExames = examesPorTipo.map((e, i) => ({
    name: e.tipoExame.replace('_', ' '),
    quantidade: e._count.id,
    color: COLORS[i % COLORS.length]
  }));

  // Consultas por mês (simulado)
  const consultasPorMes = [
    { mes: 'Jan', consultas: 45 },
    { mes: 'Fev', consultas: 52 },
    { mes: 'Mar', consultas: 48 },
    { mes: 'Abr', consultas: 61 },
    { mes: 'Mai', consultas: 55 },
    { mes: 'Jun', consultas: 67 },
    { mes: 'Jul', consultas: 59 },
    { mes: 'Ago', consultas: 71 },
    { mes: 'Set', consultas: 63 },
    { mes: 'Out', consultas: 58 },
    { mes: 'Nov', consultas: 49 },
    { mes: 'Dez', consultas: 42 },
  ];

  const handleExportarPDF = () => {
    alert('Relatório exportado para PDF! (Funcionalidade simulada)');
  };

  const handleExportarExcel = () => {
    alert('Relatório exportado para Excel! (Funcionalidade simulada)');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Relatórios e Estatísticas</h2>
          <p className="text-gray-500">Análise completa dos dados da clínica</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleExportarPDF}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Exportar PDF
          </Button>
          <Button 
            variant="outline"
            onClick={handleExportarExcel}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-white to-teal-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Pacientes
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-teal-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{resumo.totalPacientes}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+12%</span>
              <span className="text-xs text-gray-500">este ano</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-white to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Consultas
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-cyan-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{resumo.totalConsultas}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+8%</span>
              <span className="text-xs text-gray-500">vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Exames Realizados
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{resumo.totalExames}</div>
            <div className="flex items-center gap-1 mt-1">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-blue-600 font-medium">100%</span>
              <span className="text-xs text-gray-500">processados</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-white to-purple-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tratamentos Ativos
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Pill className="w-5 h-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{resumo.tratamentosAtivos}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-gray-500">
                {resumo.totalTratamentos - resumo.tratamentosAtivos} concluídos
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos - Linha 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-teal-600" />
              Consultas por Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dadosConsultasStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dadosConsultasStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {dadosConsultasStatus.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-600">{item.name} ({item.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-600" />
              Evolução de Consultas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={consultasPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="consultas" 
                    stroke="#14b8a6" 
                    strokeWidth={2}
                    dot={{ fill: '#14b8a6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos - Linha 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Diagnósticos Mais Frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosDiagnosticos} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              Pacientes por Faixa Etária
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosFaixaEtaria}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos - Linha 3 */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="w-5 h-5 text-teal-600" />
            Exames por Tipo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosExames}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Resumo */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Resumo por Tipo de Exame</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dadosExames.map((exame, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl font-bold" style={{ color: exame.color }}>
                  {exame.quantidade}
                </p>
                <p className="text-sm text-gray-600">{exame.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações do Sistema */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">OptiCare - Sistema de Gestão Oftalmológica</h3>
              <p className="text-teal-100">
                Universidade Católica de Moçambique - Faculdade de Economia e Gestão
              </p>
              <p className="text-teal-100 text-sm mt-1">
                Desenvolvido por: Wilfred Deloviar Júnior | Orientador: Eng. Persson Domingos Abrantes
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-teal-100">Versão 1.0</p>
              <p className="text-sm text-teal-100">© 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

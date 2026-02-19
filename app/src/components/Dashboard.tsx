import { useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Eye, 
  Pill, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
} from 'recharts';

const COLORS = ['#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b'];

export function Dashboard() {
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

  const { resumo, consultasPorStatus, diagnosticosFrequentes, proximasConsultas, consultasRecentes } = estatisticas;

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

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      AGENDADA: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      CONFIRMADA: 'bg-blue-100 text-blue-800 border-blue-200',
      EM_ANDAMENTO: 'bg-purple-100 text-purple-800 border-purple-200',
      CONCLUIDA: 'bg-green-100 text-green-800 border-green-200',
      CANCELADA: 'bg-red-100 text-red-800 border-red-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
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
              <span className="text-xs text-gray-500">este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-white to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Consultas do Mês
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-cyan-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{resumo.consultasMes}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">+8%</span>
              <span className="text-xs text-gray-500">vs mês anterior</span>
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
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600 font-medium">100%</span>
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
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-orange-600 font-medium">
                {resumo.tratamentosAtivos}
              </span>
              <span className="text-xs text-gray-500">em acompanhamento</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Consultas por Status</CardTitle>
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
            <CardTitle className="text-lg">Diagnósticos Mais Frequentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosDiagnosticos}>
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
      </div>

      {/* Listas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              Próximas Consultas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {proximasConsultas.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhuma consulta agendada</p>
              ) : (
                proximasConsultas.slice(0, 5).map((consulta) => (
                  <div 
                    key={consulta.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{consulta.pacienteNome}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(consulta.data).toLocaleDateString()} às {consulta.hora} • {consulta.medicoNome}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusBadge(consulta.status)}>
                      {consulta.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              Consultas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {consultasRecentes.slice(0, 5).map((consulta) => (
                <div 
                  key={consulta.id} 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{consulta.pacienteNome}</p>
                      <p className="text-xs text-gray-500">
                        {consulta.motivo}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(consulta.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

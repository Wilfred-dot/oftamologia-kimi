import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar,
  Clock,
  User,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppState } from '@/hooks/useAppState';
import type { Consulta, StatusConsulta, TipoConsulta } from '@/services';

const tiposConsulta: { value: TipoConsulta; label: string }[] = [
  { value: 'PRIMEIRA_CONSULTA', label: 'Primeira Consulta' },
  { value: 'RETORNO', label: 'Retorno' },
  { value: 'EXAME', label: 'Exame' },
  { value: 'CIRURGIA', label: 'Cirurgia' },
];

const statusConsulta: { value: StatusConsulta; label: string; color: string }[] = [
  { value: 'AGENDADA', label: 'Agendada', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'CONFIRMADA', label: 'Confirmada', color: 'bg-blue-100 text-blue-800' },
  { value: 'EM_ANDAMENTO', label: 'Em Andamento', color: 'bg-purple-100 text-purple-800' },
  { value: 'CONCLUIDA', label: 'Concluída', color: 'bg-green-100 text-green-800' },
  { value: 'CANCELADA', label: 'Cancelada', color: 'bg-red-100 text-red-800' },
];

export function Consultas() {
  const { 
    consultas, 
    medicos,
    carregarConsultas, 
    carregarMedicos,
    adicionarConsulta, 
    atualizarConsulta, 
    removerConsulta,
    isLoading 
  } = useAppState();
  
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<string>('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogVer, setDialogVer] = useState(false);
  const [dialogExcluir, setDialogExcluir] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState<Consulta | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  
  // Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  // Formulário
  const [formData, setFormData] = useState({
    pacienteId: '',
    medicoId: '',
    data: '',
    hora: '',
    tipo: 'PRIMEIRA_CONSULTA' as TipoConsulta,
    status: 'AGENDADA' as StatusConsulta,
    motivo: '',
    observacoes: ''
  });

  useEffect(() => {
    carregarConsultas(paginaAtual, itensPorPagina, busca, filtroStatus || undefined);
    carregarMedicos();
  }, [paginaAtual, busca, filtroStatus]);

  const handleNovaConsulta = () => {
    setModoEdicao(false);
    setFormData({
      pacienteId: '',
      medicoId: '',
      data: '',
      hora: '',
      tipo: 'PRIMEIRA_CONSULTA',
      status: 'AGENDADA',
      motivo: '',
      observacoes: ''
    });
    setDialogAberto(true);
  };

  const handleEditar = (consulta: Consulta) => {
    setModoEdicao(true);
    setConsultaSelecionada(consulta);
    setFormData({
      pacienteId: consulta.pacienteId,
      medicoId: consulta.medicoId,
      data: consulta.data.split('T')[0],
      hora: consulta.hora,
      tipo: consulta.tipo,
      status: consulta.status,
      motivo: consulta.motivo,
      observacoes: consulta.observacoes || ''
    });
    setDialogAberto(true);
  };

  const handleVer = (consulta: Consulta) => {
    setConsultaSelecionada(consulta);
    setDialogVer(true);
  };

  const handleExcluir = (consulta: Consulta) => {
    setConsultaSelecionada(consulta);
    setDialogExcluir(true);
  };

  const confirmarExclusao = async () => {
    if (consultaSelecionada) {
      await removerConsulta(consultaSelecionada.id);
      setDialogExcluir(false);
      setConsultaSelecionada(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modoEdicao && consultaSelecionada) {
      await atualizarConsulta(consultaSelecionada.id, formData);
    } else {
      await adicionarConsulta(formData);
    }
    setDialogAberto(false);
  };

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

  const getTipoLabel = (tipo: string) => {
    return tiposConsulta.find(t => t.value === tipo)?.label || tipo;
  };

  const handleStatusChange = async (consulta: Consulta, novoStatus: StatusConsulta) => {
    await atualizarConsulta(consulta.id, { status: novoStatus });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agendamento de Consultas</h2>
          <p className="text-gray-500">Gerencie as consultas da clínica</p>
        </div>
        <Button 
          onClick={handleNovaConsulta}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Consulta
        </Button>
      </div>

      {/* Filtros */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por paciente, médico ou motivo..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filtroStatus} onValueChange={setFiltroStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os Status</SelectItem>
                {statusConsulta.map(s => (
                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Paciente</TableHead>
                <TableHead>Médico</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-teal-600" />
                  </TableCell>
                </TableRow>
              ) : consultas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Nenhuma consulta encontrada
                  </TableCell>
                </TableRow>
              ) : (
                consultas.map((consulta) => (
                  <TableRow key={consulta.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{consulta.pacienteNome}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-gray-400" />
                        <span>{consulta.medicoNome}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(consulta.data).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500 text-sm">
                          <Clock className="w-3 h-3" />
                          {consulta.hora}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTipoLabel(consulta.tipo)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={consulta.status} 
                        onValueChange={(value) => handleStatusChange(consulta, value as StatusConsulta)}
                      >
                        <SelectTrigger className={`w-32 text-xs ${getStatusBadge(consulta.status)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusConsulta.map(s => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleVer(consulta)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditar(consulta)}
                          className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleExcluir(consulta)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Paginação */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Página {paginaAtual}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
            disabled={paginaAtual === 1 || isLoading}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPaginaAtual(p => p + 1)}
            disabled={consultas.length < itensPorPagina || isLoading}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Dialog Nova/Editar Consulta */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{modoEdicao ? 'Editar Consulta' : 'Nova Consulta'}</DialogTitle>
            <DialogDescription>
              Preencha os dados da consulta abaixo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="paciente">Paciente *</Label>
                <Input
                  id="pacienteId"
                  placeholder="ID do paciente"
                  value={formData.pacienteId}
                  onChange={(e) => setFormData({ ...formData, pacienteId: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medico">Médico *</Label>
                <Select
                  value={formData.medicoId}
                  onValueChange={(value) => setFormData({ ...formData, medicoId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o médico" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicos.map((m) => (
                      <SelectItem key={m.id} value={m.id}>{m.nome}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora *</Label>
                <Input
                  id="hora"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Consulta *</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value: any) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposConsulta.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusConsulta.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="motivo">Motivo da Consulta *</Label>
                <Input
                  id="motivo"
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  placeholder="Descreva o motivo da consulta"
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Observações adicionais"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogAberto(false)}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-teal-500 to-cyan-600"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {modoEdicao ? 'Salvar Alterações' : 'Agendar Consulta'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Ver Consulta */}
      <Dialog open={dialogVer} onOpenChange={setDialogVer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Consulta</DialogTitle>
          </DialogHeader>
          {consultaSelecionada && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusBadge(consultaSelecionada.status)}>
                  {statusConsulta.find(s => s.value === consultaSelecionada.status)?.label}
                </Badge>
                <Badge variant="outline">
                  {getTipoLabel(consultaSelecionada.tipo)}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Paciente</p>
                  <p className="font-medium text-lg">{consultaSelecionada.pacienteNome}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Médico</p>
                  <p className="font-medium">{consultaSelecionada.medicoNome}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Data</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(consultaSelecionada.data).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Hora</p>
                    <p className="font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {consultaSelecionada.hora}
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Motivo</p>
                  <p className="font-medium">{consultaSelecionada.motivo}</p>
                </div>
                {consultaSelecionada.observacoes && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Observações</p>
                    <p className="font-medium">{consultaSelecionada.observacoes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog Confirmar Exclusão */}
      <Dialog open={dialogExcluir} onOpenChange={setDialogExcluir}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta consulta de <strong>{consultaSelecionada?.pacienteNome}</strong>?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogExcluir(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmarExclusao} disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

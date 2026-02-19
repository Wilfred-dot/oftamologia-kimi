import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Eye, 
  Pill,
  User,
  Calendar,
  XCircle,
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
import type { Tratamento, TipoTratamento, StatusTratamento, CreateMedicamentoData } from '@/services';

const tiposTratamento: { value: TipoTratamento; label: string }[] = [
  { value: 'MEDICAMENTOSO', label: 'Medicamentoso' },
  { value: 'CIRURGICO', label: 'Cirúrgico' },
  { value: 'FISIOTERAPICO', label: 'Fisioterápico' },
  { value: 'OUTRO', label: 'Outro' },
];

const statusTratamento: { value: StatusTratamento; label: string; color: string }[] = [
  { value: 'EM_ANDAMENTO', label: 'Em Andamento', color: 'bg-blue-100 text-blue-800' },
  { value: 'CONCLUIDO', label: 'Concluído', color: 'bg-green-100 text-green-800' },
  { value: 'CANCELADO', label: 'Cancelado', color: 'bg-red-100 text-red-800' },
];

export function Tratamentos() {
  const { 
    tratamentos, 
    carregarTratamentos, 
    adicionarTratamento,
    isLoading 
  } = useAppState();
  
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogVer, setDialogVer] = useState(false);
  const [tratamentoSelecionado, setTratamentoSelecionado] = useState<Tratamento | null>(null);
  
  // Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  // Formulário
  const [formData, setFormData] = useState({
    pacienteId: '',
    exameId: '',
    dataInicio: '',
    dataFim: '',
    tipo: 'MEDICAMENTOSO' as TipoTratamento,
    descricao: '',
    instrucoes: '',
    status: 'EM_ANDAMENTO' as StatusTratamento,
    medicamentos: [] as CreateMedicamentoData[]
  });

  const [novoMedicamento, setNovoMedicamento] = useState({
    nome: '',
    dosagem: '',
    frequencia: '',
    duracao: ''
  });

  useEffect(() => {
    carregarTratamentos(paginaAtual, itensPorPagina, busca);
  }, [paginaAtual, busca]);

  const handleNovoTratamento = () => {
    setFormData({
      pacienteId: '',
      exameId: '',
      dataInicio: '',
      dataFim: '',
      tipo: 'MEDICAMENTOSO',
      descricao: '',
      instrucoes: '',
      status: 'EM_ANDAMENTO',
      medicamentos: []
    });
    setDialogAberto(true);
  };

  const handleVer = (tratamento: Tratamento) => {
    setTratamentoSelecionado(tratamento);
    setDialogVer(true);
  };

  const adicionarMedicamento = () => {
    if (novoMedicamento.nome && novoMedicamento.dosagem) {
      setFormData({
        ...formData,
        medicamentos: [...formData.medicamentos, novoMedicamento]
      });
      setNovoMedicamento({ nome: '', dosagem: '', frequencia: '', duracao: '' });
    }
  };

  const removerMedicamento = (index: number) => {
    setFormData({
      ...formData,
      medicamentos: formData.medicamentos.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await adicionarTratamento(formData);
    setDialogAberto(false);
  };

  const getTipoLabel = (tipo: string) => {
    return tiposTratamento.find(t => t.value === tipo)?.label || tipo;
  };

  const getStatusBadge = (status: string) => {
    return statusTratamento.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tratamentos</h2>
          <p className="text-gray-500">Gerencie os tratamentos dos pacientes</p>
        </div>
        <Button 
          onClick={handleNovoTratamento}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Tratamento
        </Button>
      </div>

      {/* Busca */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por paciente ou descrição..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10"
            />
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
                <TableHead>Tipo</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Início</TableHead>
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
              ) : tratamentos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Nenhum tratamento encontrado
                  </TableCell>
                </TableRow>
              ) : (
                tratamentos.map((tratamento) => (
                  <TableRow key={tratamento.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{tratamento.paciente?.nome || 'Paciente'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getTipoLabel(tratamento.tipo)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700 line-clamp-1">{tratamento.descricao}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(tratamento.dataInicio).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(tratamento.status)}>
                        {statusTratamento.find(s => s.value === tratamento.status)?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleVer(tratamento)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
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
            disabled={tratamentos.length < itensPorPagina || isLoading}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Dialog Novo Tratamento */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Tratamento</DialogTitle>
            <DialogDescription>
              Preencha os dados do tratamento abaixo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="tipo">Tipo de Tratamento *</Label>
                  <Select
                    value={formData.tipo}
                    onValueChange={(value: any) => setFormData({ ...formData, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposTratamento.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de Início *</Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={formData.dataInicio}
                    onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data de Término (opcional)</Label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={formData.dataFim}
                    onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição do Tratamento *</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva o tratamento"
                  required
                />
              </div>

              {/* Medicamentos */}
              {formData.tipo === 'MEDICAMENTOSO' && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Medicamentos</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Nome do medicamento"
                      value={novoMedicamento.nome}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, nome: e.target.value })}
                    />
                    <Input
                      placeholder="Dosagem (ex: 1 gota)"
                      value={novoMedicamento.dosagem}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, dosagem: e.target.value })}
                    />
                    <Input
                      placeholder="Frequência (ex: 3x ao dia)"
                      value={novoMedicamento.frequencia}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, frequencia: e.target.value })}
                    />
                    <Input
                      placeholder="Duração (ex: 7 dias)"
                      value={novoMedicamento.duracao}
                      onChange={(e) => setNovoMedicamento({ ...novoMedicamento, duracao: e.target.value })}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={adicionarMedicamento}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Medicamento
                  </Button>

                  {formData.medicamentos.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Medicamentos adicionados:</p>
                      {formData.medicamentos.map((med, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                          <div className="text-sm">
                            <span className="font-medium">{med.nome}</span>
                            <span className="text-gray-500"> - {med.dosagem}, {med.frequencia}, {med.duracao}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removerMedicamento(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="instrucoes">Instruções *</Label>
                <Textarea
                  id="instrucoes"
                  value={formData.instrucoes}
                  onChange={(e) => setFormData({ ...formData, instrucoes: e.target.value })}
                  placeholder="Instruções para o paciente"
                  required
                />
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
                    {statusTratamento.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                Salvar Tratamento
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Ver Tratamento */}
      <Dialog open={dialogVer} onOpenChange={setDialogVer}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Tratamento</DialogTitle>
          </DialogHeader>
          {tratamentoSelecionado && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Paciente</p>
                  <p className="text-xl font-bold">{tratamentoSelecionado.paciente?.nome || 'Paciente'}</p>
                </div>
                <Badge className={getStatusBadge(tratamentoSelecionado.status)}>
                  {statusTratamento.find(s => s.value === tratamentoSelecionado.status)?.label}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Tipo</p>
                  <p className="font-medium">{getTipoLabel(tratamentoSelecionado.tipo)}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Data de Início</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(tratamentoSelecionado.dataInicio).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-blue-900 mb-2">Descrição</h4>
                <p className="text-gray-800">{tratamentoSelecionado.descricao}</p>
              </div>

              {tratamentoSelecionado.medicamentos && tratamentoSelecionado.medicamentos.length > 0 && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-3">Medicamentos</h4>
                  <div className="space-y-2">
                    {tratamentoSelecionado.medicamentos.map((med, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-white rounded">
                        <Pill className="w-4 h-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">{med.nome}</p>
                          <p className="text-sm text-gray-600">
                            {med.dosagem} • {med.frequencia} • {med.duracao}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <h4 className="font-semibold text-yellow-900 mb-2">Instruções</h4>
                <p className="text-gray-800">{tratamentoSelecionado.instrucoes}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

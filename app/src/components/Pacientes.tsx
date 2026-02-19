import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Eye, 
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
import type { Paciente } from '@/services';

export function Pacientes() {
  const { 
    pacientes, 
    carregarPacientes, 
    adicionarPaciente, 
    atualizarPaciente, 
    removerPaciente,
    isLoading 
  } = useAppState();
  
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogVer, setDialogVer] = useState(false);
  const [dialogExcluir, setDialogExcluir] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);
  
  // Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  // Formulário
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    genero: 'MASCULINO' as 'MASCULINO' | 'FEMININO' | 'OUTRO',
    telefone: '',
    email: '',
    endereco: '',
    numeroBI: '',
    alergias: '',
    condicoesPreexistentes: ''
  });

  useEffect(() => {
    carregarPacientes(paginaAtual, itensPorPagina, busca);
  }, [paginaAtual, busca]);

  const handleNovoPaciente = () => {
    setModoEdicao(false);
    setFormData({
      nome: '',
      dataNascimento: '',
      genero: 'MASCULINO',
      telefone: '',
      email: '',
      endereco: '',
      numeroBI: '',
      alergias: '',
      condicoesPreexistentes: ''
    });
    setDialogAberto(true);
  };

  const handleEditar = (paciente: Paciente) => {
    setModoEdicao(true);
    setPacienteSelecionado(paciente);
    setFormData({
      nome: paciente.nome,
      dataNascimento: paciente.dataNascimento.split('T')[0],
      genero: paciente.genero,
      telefone: paciente.telefone,
      email: paciente.email || '',
      endereco: paciente.endereco,
      numeroBI: paciente.numeroBI,
      alergias: paciente.alergias || '',
      condicoesPreexistentes: paciente.condicoesPreexistentes || ''
    });
    setDialogAberto(true);
  };

  const handleVer = (paciente: Paciente) => {
    setPacienteSelecionado(paciente);
    setDialogVer(true);
  };

  const handleExcluir = (paciente: Paciente) => {
    setPacienteSelecionado(paciente);
    setDialogExcluir(true);
  };

  const confirmarExclusao = async () => {
    if (pacienteSelecionado) {
      await removerPaciente(pacienteSelecionado.id);
      setDialogExcluir(false);
      setPacienteSelecionado(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modoEdicao && pacienteSelecionado) {
      await atualizarPaciente(pacienteSelecionado.id, formData);
    } else {
      await adicionarPaciente(formData);
    }
    setDialogAberto(false);
  };

  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Pacientes</h2>
          <p className="text-gray-500">Cadastre e gerencie os pacientes da clínica</p>
        </div>
        <Button 
          onClick={handleNovoPaciente}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Paciente
        </Button>
      </div>

      {/* Busca */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, telefone ou BI..."
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
                <TableHead>Idade</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>BI</TableHead>
                <TableHead>Condições</TableHead>
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
              ) : pacientes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Nenhum paciente encontrado
                  </TableCell>
                </TableRow>
              ) : (
                pacientes.map((paciente) => (
                  <TableRow key={paciente.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{paciente.nome}</p>
                          <p className="text-xs text-gray-500 capitalize">{paciente.genero.toLowerCase()}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{calcularIdade(paciente.dataNascimento)} anos</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        {paciente.telefone}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{paciente.numeroBI}</TableCell>
                    <TableCell>
                      {paciente.condicoesPreexistentes ? (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          {paciente.condicoesPreexistentes}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleVer(paciente)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditar(paciente)}
                          className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleExcluir(paciente)}
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
            disabled={pacientes.length < itensPorPagina || isLoading}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Dialog Novo/Editar Paciente */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{modoEdicao ? 'Editar Paciente' : 'Novo Paciente'}</DialogTitle>
            <DialogDescription>
              Preencha os dados do paciente abaixo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                <Input
                  id="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genero">Gênero *</Label>
                <Select
                  value={formData.genero}
                  onValueChange={(value: any) => setFormData({ ...formData, genero: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MASCULINO">Masculino</SelectItem>
                    <SelectItem value="FEMININO">Feminino</SelectItem>
                    <SelectItem value="OUTRO">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone *</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  placeholder="+258 XX XXX XXXX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroBI">Número do BI *</Label>
                <Input
                  id="numeroBI"
                  value={formData.numeroBI}
                  onChange={(e) => setFormData({ ...formData, numeroBI: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="endereco">Endereço *</Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="alergias">Alergias</Label>
                <Input
                  id="alergias"
                  value={formData.alergias}
                  onChange={(e) => setFormData({ ...formData, alergias: e.target.value })}
                  placeholder="Liste as alergias conhecidas"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="condicoes">Condições Pré-existentes</Label>
                <Input
                  id="condicoes"
                  value={formData.condicoesPreexistentes}
                  onChange={(e) => setFormData({ ...formData, condicoesPreexistentes: e.target.value })}
                  placeholder="Diabetes, hipertensão, etc."
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
                {modoEdicao ? 'Salvar Alterações' : 'Cadastrar Paciente'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Ver Paciente */}
      <Dialog open={dialogVer} onOpenChange={setDialogVer}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ficha do Paciente</DialogTitle>
          </DialogHeader>
          {pacienteSelecionado && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{pacienteSelecionado.nome}</h3>
                  <p className="text-gray-500">
                    {calcularIdade(pacienteSelecionado.dataNascimento)} anos • {pacienteSelecionado.genero}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="font-medium">{pacienteSelecionado.telefone}</p>
                  </div>
                </div>
                {pacienteSelecionado.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{pacienteSelecionado.email}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Endereço</p>
                    <p className="font-medium">{pacienteSelecionado.endereco}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">BI</p>
                    <p className="font-medium font-mono">{pacienteSelecionado.numeroBI}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-500">Data de Cadastro</p>
                    <p className="font-medium">{new Date(pacienteSelecionado.dataCadastro).toLocaleDateString()}</p>
                  </div>
                </div>
                {pacienteSelecionado.alergias && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-sm text-red-600 font-medium">⚠️ Alergias</p>
                    <p className="text-red-700">{pacienteSelecionado.alergias}</p>
                  </div>
                )}
                {pacienteSelecionado.condicoesPreexistentes && (
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <p className="text-sm text-yellow-600 font-medium">Condições Pré-existentes</p>
                    <p className="text-yellow-700">{pacienteSelecionado.condicoesPreexistentes}</p>
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
              Tem certeza que deseja excluir o paciente <strong>{pacienteSelecionado?.nome}</strong>?
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

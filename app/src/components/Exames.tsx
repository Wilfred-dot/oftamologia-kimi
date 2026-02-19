import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Eye, 
  User,
  Calendar,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppState } from '@/hooks/useAppState';
import type { Exame, TipoExame } from '@/services';

const tiposExame: { value: TipoExame; label: string }[] = [
  { value: 'AV_VISUAL', label: 'Acuidade Visual' },
  { value: 'TONOMETRIA', label: 'Tonometria' },
  { value: 'FUNDOSCOPIA', label: 'Fundoscopia' },
  { value: 'REFRACAO', label: 'Refração' },
  { value: 'OCT', label: 'OCT (Tomografia)' },
  { value: 'CAMPO_VISUAL', label: 'Campo Visual' },
  { value: 'OUTRO', label: 'Outro' },
];

export function Exames() {
  const { 
    exames, 
    carregarExames, 
    adicionarExame,
    isLoading 
  } = useAppState();
  
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dialogVer, setDialogVer] = useState(false);
  const [exameSelecionado, setExameSelecionado] = useState<Exame | null>(null);
  
  // Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  // Formulário
  const [formData, setFormData] = useState({
    pacienteId: '',
    consultaId: '',
    data: '',
    tipoExame: 'AV_VISUAL' as TipoExame,
    olhoDireito: {
      avSemCorrecao: '',
      avComCorrecao: '',
      pressaoIntraocular: undefined as number | undefined,
      refracao: '',
      observacoes: ''
    },
    olhoEsquerdo: {
      avSemCorrecao: '',
      avComCorrecao: '',
      pressaoIntraocular: undefined as number | undefined,
      refracao: '',
      observacoes: ''
    },
    diagnostico: '',
    conduta: '',
    observacoesGerais: ''
  });

  useEffect(() => {
    carregarExames(paginaAtual, itensPorPagina, busca);
  }, [paginaAtual, busca]);

  const handleNovoExame = () => {
    setFormData({
      pacienteId: '',
      consultaId: '',
      data: '',
      tipoExame: 'AV_VISUAL',
      olhoDireito: {
        avSemCorrecao: '',
        avComCorrecao: '',
        pressaoIntraocular: undefined,
        refracao: '',
        observacoes: ''
      },
      olhoEsquerdo: {
        avSemCorrecao: '',
        avComCorrecao: '',
        pressaoIntraocular: undefined,
        refracao: '',
        observacoes: ''
      },
      diagnostico: '',
      conduta: '',
      observacoesGerais: ''
    });
    setDialogAberto(true);
  };

  const handleVer = (exame: Exame) => {
    setExameSelecionado(exame);
    setDialogVer(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await adicionarExame(formData);
    setDialogAberto(false);
  };

  const getTipoLabel = (tipo: string) => {
    return tiposExame.find(t => t.value === tipo)?.label || tipo;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Exames Oftalmológicos</h2>
          <p className="text-gray-500">Registre e consulte exames dos pacientes</p>
        </div>
        <Button 
          onClick={handleNovoExame}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Exame
        </Button>
      </div>

      {/* Busca */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por paciente ou tipo de exame..."
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
                <TableHead>Tipo de Exame</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Diagnóstico</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-teal-600" />
                  </TableCell>
                </TableRow>
              ) : exames.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Nenhum exame encontrado
                  </TableCell>
                </TableRow>
              ) : (
                exames.map((exame) => (
                  <TableRow key={exame.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{exame.paciente?.nome || 'Paciente'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                        {getTipoLabel(exame.tipoExame)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(exame.data).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700 line-clamp-1">{exame.diagnostico}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleVer(exame)}
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
            disabled={exames.length < itensPorPagina || isLoading}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Dialog Novo Exame */}
      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Exame Oftalmológico</DialogTitle>
            <DialogDescription>
              Preencha os dados do exame abaixo
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 py-4">
              {/* Dados Gerais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  <Label htmlFor="tipoExame">Tipo de Exame *</Label>
                  <Select
                    value={formData.tipoExame}
                    onValueChange={(value: any) => setFormData({ ...formData, tipoExame: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposExame.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
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
              </div>

              {/* Olho Direito e Esquerdo */}
              <Tabs defaultValue="od" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="od">Olho Direito (OD)</TabsTrigger>
                  <TabsTrigger value="oe">Olho Esquerdo (OE)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="od" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>AV Sem Correção</Label>
                      <Input
                        placeholder="Ex: 20/80"
                        value={formData.olhoDireito.avSemCorrecao}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoDireito: { ...formData.olhoDireito, avSemCorrecao: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>AV Com Correção</Label>
                      <Input
                        placeholder="Ex: 20/20"
                        value={formData.olhoDireito.avComCorrecao}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoDireito: { ...formData.olhoDireito, avComCorrecao: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pressão Intraocular (mmHg)</Label>
                      <Input
                        type="number"
                        placeholder="Ex: 16"
                        value={formData.olhoDireito.pressaoIntraocular || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoDireito: { ...formData.olhoDireito, pressaoIntraocular: Number(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Refração</Label>
                      <Input
                        placeholder="Ex: -2.50 -1.00 x 180"
                        value={formData.olhoDireito.refracao}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoDireito: { ...formData.olhoDireito, refracao: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Observações</Label>
                      <Textarea
                        placeholder="Observações específicas do olho direito"
                        value={formData.olhoDireito.observacoes}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoDireito: { ...formData.olhoDireito, observacoes: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="oe" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>AV Sem Correção</Label>
                      <Input
                        placeholder="Ex: 20/60"
                        value={formData.olhoEsquerdo.avSemCorrecao}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoEsquerdo: { ...formData.olhoEsquerdo, avSemCorrecao: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>AV Com Correção</Label>
                      <Input
                        placeholder="Ex: 20/20"
                        value={formData.olhoEsquerdo.avComCorrecao}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoEsquerdo: { ...formData.olhoEsquerdo, avComCorrecao: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pressão Intraocular (mmHg)</Label>
                      <Input
                        type="number"
                        placeholder="Ex: 18"
                        value={formData.olhoEsquerdo.pressaoIntraocular || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoEsquerdo: { ...formData.olhoEsquerdo, pressaoIntraocular: Number(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Refração</Label>
                      <Input
                        placeholder="Ex: -1.75 -0.50 x 90"
                        value={formData.olhoEsquerdo.refracao}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoEsquerdo: { ...formData.olhoEsquerdo, refracao: e.target.value }
                        })}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Observações</Label>
                      <Textarea
                        placeholder="Observações específicas do olho esquerdo"
                        value={formData.olhoEsquerdo.observacoes}
                        onChange={(e) => setFormData({
                          ...formData,
                          olhoEsquerdo: { ...formData.olhoEsquerdo, observacoes: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Diagnóstico e Conduta */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnostico">Diagnóstico *</Label>
                  <Textarea
                    id="diagnostico"
                    value={formData.diagnostico}
                    onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
                    placeholder="Diagnóstico do exame"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conduta">Conduta *</Label>
                  <Textarea
                    id="conduta"
                    value={formData.conduta}
                    onChange={(e) => setFormData({ ...formData, conduta: e.target.value })}
                    placeholder="Conduta recomendada"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observacoesGerais">Observações Gerais</Label>
                  <Textarea
                    id="observacoesGerais"
                    value={formData.observacoesGerais}
                    onChange={(e) => setFormData({ ...formData, observacoesGerais: e.target.value })}
                    placeholder="Observações gerais sobre o exame"
                  />
                </div>
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
                Salvar Exame
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog Ver Exame */}
      <Dialog open={dialogVer} onOpenChange={setDialogVer}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resultado do Exame</DialogTitle>
          </DialogHeader>
          {exameSelecionado && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Paciente</p>
                  <p className="text-xl font-bold">{exameSelecionado.paciente?.nome || 'Paciente'}</p>
                </div>
                <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                  {getTipoLabel(exameSelecionado.tipoExame)}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3">Olho Direito (OD)</h4>
                  {exameSelecionado.odAvSemCorrecao && (
                    <p className="text-sm"><span className="text-gray-600">AV sem correção:</span> {exameSelecionado.odAvSemCorrecao}</p>
                  )}
                  {exameSelecionado.odAvComCorrecao && (
                    <p className="text-sm"><span className="text-gray-600">AV com correção:</span> {exameSelecionado.odAvComCorrecao}</p>
                  )}
                  {exameSelecionado.odPressao && (
                    <p className="text-sm"><span className="text-gray-600">Pressão:</span> {exameSelecionado.odPressao} mmHg</p>
                  )}
                  {exameSelecionado.odRefracao && (
                    <p className="text-sm"><span className="text-gray-600">Refração:</span> {exameSelecionado.odRefracao}</p>
                  )}
                  {exameSelecionado.odObservacoes && (
                    <p className="text-sm mt-2"><span className="text-gray-600">Obs:</span> {exameSelecionado.odObservacoes}</p>
                  )}
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-3">Olho Esquerdo (OE)</h4>
                  {exameSelecionado.oeAvSemCorrecao && (
                    <p className="text-sm"><span className="text-gray-600">AV sem correção:</span> {exameSelecionado.oeAvSemCorrecao}</p>
                  )}
                  {exameSelecionado.oeAvComCorrecao && (
                    <p className="text-sm"><span className="text-gray-600">AV com correção:</span> {exameSelecionado.oeAvComCorrecao}</p>
                  )}
                  {exameSelecionado.oePressao && (
                    <p className="text-sm"><span className="text-gray-600">Pressão:</span> {exameSelecionado.oePressao} mmHg</p>
                  )}
                  {exameSelecionado.oeRefracao && (
                    <p className="text-sm"><span className="text-gray-600">Refração:</span> {exameSelecionado.oeRefracao}</p>
                  )}
                  {exameSelecionado.oeObservacoes && (
                    <p className="text-sm mt-2"><span className="text-gray-600">Obs:</span> {exameSelecionado.oeObservacoes}</p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <h4 className="font-semibold text-yellow-900 mb-2">Diagnóstico</h4>
                <p className="text-gray-800">{exameSelecionado.diagnostico}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-900 mb-2">Conduta</h4>
                <p className="text-gray-800">{exameSelecionado.conduta}</p>
              </div>

              {exameSelecionado.observacoesGerais && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Observações Gerais</h4>
                  <p className="text-gray-700">{exameSelecionado.observacoesGerais}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

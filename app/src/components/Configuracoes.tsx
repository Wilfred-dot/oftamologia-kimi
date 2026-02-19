import { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Mail,
  Shield,
  Save,
  Building2,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppState } from '@/hooks/useAppState';

export function Configuracoes() {
  const { usuarioLogado } = useAppState();
  
  const [dadosClinica, setDadosClinica] = useState({
    nome: 'Clínica Oftalmológica OptiCare',
    endereco: 'Avenida Eduardo Mondlane, 1234 - Beira, Moçambique',
    telefone: '+258 23 123 456',
    email: 'contato@opticare.co.mz',
    horario: 'Segunda a Sexta: 08:00 - 17:00',
    sobre: 'Clínica especializada em saúde ocular, oferecendo serviços de diagnóstico, tratamento e cirurgia oftalmológica.'
  });

  const [dadosUsuario, setDadosUsuario] = useState({
    nome: usuarioLogado?.nome || '',
    email: usuarioLogado?.email || '',
    telefone: '+258 84 123 4567',
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: ''
  });

  const [notificacoes, setNotificacoes] = useState({
    emailConsultas: true,
    emailExames: true,
    smsLembretes: false,
    sistemaAtualizacoes: true,
    sistemaBackup: true
  });

  const handleSalvarClinica = () => {
    alert('Dados da clínica salvos com sucesso!');
  };

  const handleSalvarPerfil = () => {
    alert('Perfil atualizado com sucesso!');
  };

  const handleSalvarNotificacoes = () => {
    alert('Configurações de notificações salvas!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>
        <p className="text-gray-500">Gerencie as configurações do sistema</p>
      </div>

      <Tabs defaultValue="clinica" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="clinica" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Clínica
          </TabsTrigger>
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Aba Clínica */}
        <TabsContent value="clinica" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                Dados da Clínica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeClinica">Nome da Clínica</Label>
                  <Input
                    id="nomeClinica"
                    value={dadosClinica.nome}
                    onChange={(e) => setDadosClinica({ ...dadosClinica, nome: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoneClinica">Telefone</Label>
                  <Input
                    id="telefoneClinica"
                    value={dadosClinica.telefone}
                    onChange={(e) => setDadosClinica({ ...dadosClinica, telefone: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="enderecoClinica">Endereço</Label>
                  <Input
                    id="enderecoClinica"
                    value={dadosClinica.endereco}
                    onChange={(e) => setDadosClinica({ ...dadosClinica, endereco: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailClinica">Email</Label>
                  <Input
                    id="emailClinica"
                    type="email"
                    value={dadosClinica.email}
                    onChange={(e) => setDadosClinica({ ...dadosClinica, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="horarioClinica">Horário de Funcionamento</Label>
                  <Input
                    id="horarioClinica"
                    value={dadosClinica.horario}
                    onChange={(e) => setDadosClinica({ ...dadosClinica, horario: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="sobreClinica">Sobre a Clínica</Label>
                  <Textarea
                    id="sobreClinica"
                    value={dadosClinica.sobre}
                    onChange={(e) => setDadosClinica({ ...dadosClinica, sobre: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
              <Button 
                onClick={handleSalvarClinica}
                className="bg-gradient-to-r from-teal-500 to-cyan-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Perfil */}
        <TabsContent value="perfil" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-teal-600" />
                Meu Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold">{usuarioLogado?.nome}</p>
                  <p className="text-gray-500 capitalize">{usuarioLogado?.perfil}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nomeUsuario">Nome Completo</Label>
                  <Input
                    id="nomeUsuario"
                    value={dadosUsuario.nome}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, nome: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailUsuario">Email</Label>
                  <Input
                    id="emailUsuario"
                    type="email"
                    value={dadosUsuario.email}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoneUsuario">Telefone</Label>
                  <Input
                    id="telefoneUsuario"
                    value={dadosUsuario.telefone}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, telefone: e.target.value })}
                  />
                </div>
              </div>
              <Button 
                onClick={handleSalvarPerfil}
                className="bg-gradient-to-r from-teal-500 to-cyan-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Atualizar Perfil
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Notificações */}
        <TabsContent value="notificacoes" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-600" />
                Configurações de Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Notificações por Email
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Consultas Agendadas</p>
                      <p className="text-sm text-gray-500">Receber email quando uma consulta for agendada</p>
                    </div>
                    <Switch
                      checked={notificacoes.emailConsultas}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, emailConsultas: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Resultados de Exames</p>
                      <p className="text-sm text-gray-500">Receber email quando exames forem processados</p>
                    </div>
                    <Switch
                      checked={notificacoes.emailExames}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, emailExames: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notificações do Sistema
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Atualizações do Sistema</p>
                      <p className="text-sm text-gray-500">Receber notificações sobre novas funcionalidades</p>
                    </div>
                    <Switch
                      checked={notificacoes.sistemaAtualizacoes}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, sistemaAtualizacoes: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Backup Automático</p>
                      <p className="text-sm text-gray-500">Receber confirmação de backups realizados</p>
                    </div>
                    <Switch
                      checked={notificacoes.sistemaBackup}
                      onCheckedChange={(checked) => setNotificacoes({ ...notificacoes, sistemaBackup: checked })}
                    />
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSalvarNotificacoes}
                className="bg-gradient-to-r from-teal-500 to-cyan-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Segurança */}
        <TabsContent value="seguranca" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="w-5 h-5 text-teal-600" />
                Alterar Senha
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="senhaAtual">Senha Atual</Label>
                  <Input
                    id="senhaAtual"
                    type="password"
                    value={dadosUsuario.senhaAtual}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, senhaAtual: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="novaSenha">Nova Senha</Label>
                  <Input
                    id="novaSenha"
                    type="password"
                    value={dadosUsuario.novaSenha}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, novaSenha: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    value={dadosUsuario.confirmarSenha}
                    onChange={(e) => setDadosUsuario({ ...dadosUsuario, confirmarSenha: e.target.value })}
                  />
                </div>
              </div>
              <Button 
                onClick={() => alert('Senha alterada com sucesso!')}
                className="bg-gradient-to-r from-teal-500 to-cyan-600"
              >
                <Lock className="w-4 h-4 mr-2" />
                Alterar Senha
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-600" />
                Sessões Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Sessão Atual</p>
                      <p className="text-sm text-gray-500">Beira, Moçambique • Chrome em Windows</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

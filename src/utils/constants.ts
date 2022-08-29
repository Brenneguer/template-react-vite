export const users = [
  { nome: 'Weuller', id: 27 },
  { nome: 'Leonardo Vinicius', id: 111 },
  { nome: 'Neemias', id: 64 },
  { nome: 'Andrew', id: 70 },
  { nome: 'Wendell', id: 108 },
  { nome: 'Vinícius Messias', id: 112 },
  { nome: 'Matheus', id: 71 },
]

export const reasonSupport = [
  'Tomcat - não inicia.',
  'Tomcat - fechado, Servidor / Caixa.',
  'Tomcat - reinstalar.',
  'Servidor offline.',
  'Sistema não sincroniza, Servidor / Caixa.',
  'Servidor Atualização',
  'Caixa Tomcat não sincroniza.',
  'Caixa Tomcat não imprime setor.',
  'Fiscal - Impostos.',
  'Fiscal - Certificado.',
  'Fiscal - Comanda não fecha.',
  'Fiscal - Reconfigurar.',
  'Fiscal - Impressora.',
  'Pdv - não encontra servidor.',
  'Pdv - sem acesso a internet.',
  'Pdv - não imprime.',
  'Mobile - Não envia pedido',
  'Mobile - Não encontra o servidor.',
  'Mobile - Não conecta a rede.',
  'Gerencial - cadastro de produto.',
  'Gerencial - alteração de preço.',
  'Gerencial - dúvidas/relatórios.',
  'Gerencial - problemas fiscais/impostos.',
  'Gerencial - esqueceu a senha.',
  'Gerencial - Desbloqueio',
  'Ifood - Solicitar integração.',
  'Ifood - Desativar integração.',
  'Ifood - Falha na integração.',
  'Fechar Caixa - Relatorio não imprimiu.',
  'Impressora - não imprime Setor',
  'Impressora - rede, desconfigurada',
  'Rede - Wifi não conecta.',
  'Rede - Sem acesso a internet.',
  'Cancelamento.',
  '#coronavirus - Desconto e reativação'
];

export const defaultUrl = `http://dev.ladsistemas.com.br/
redmine/
projects/
atendimento/
issues/
new?issue[parent_issue_id]={0}&
issue[description]={1}&
issue[subject]={2}&
issue[start_date]={3}&
issue[custom_field_values][13]={4}&
issue[tracker_id]=3&
issue[assigned_to_id]={5}&
issue[custom_field_values][59][]={6}&
issue[status_id]=4&
issue[priority_id]=2&
issue[custom_field_values][91]=0&
issue[custom_field_values][61]=Chat`;

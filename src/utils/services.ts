import parentsIssues from '../../parent_issue.json';


export type IssueDetailsProps = {
  subject?: string,
  setSubject?: React.Dispatch<React.SetStateAction<string>>,
  description?: string,
  setDescription?: React.Dispatch<React.SetStateAction<string>>,
  date?: string,
  setDate?: React.Dispatch<React.SetStateAction<string>>,
  parentId?: string,
  setParentId?: React.Dispatch<React.SetStateAction<string>>,
  contact?: string,
  setContact?: React.Dispatch<React.SetStateAction<string>>,
  listIssues?: ChatMessage[],
  setListIssues: React.Dispatch<React.SetStateAction<ChatMessage[] | undefined>>,
  chatMessage: ChatMessage,
  setChatMessage: React.Dispatch<React.SetStateAction<ChatMessage>>
  index: number,
}

export type ChatMessage = {
  cliente: string,
  place: string,
  text: string,
  created_on: string,
  parentId: string,
  url: string,
}

export type JsonType = {
  query_result: {
    data: {
      rows: ChatMessage[]
    }
  }
}

export const generateMessage = (json: JsonType): ChatMessage[] => {
  const messages = json.query_result.data.rows;

  return messages.map((it) => {
    const text = JSON.parse(it.text).messages
      .filter((i: any) => i.sender.t === 'v')
      .map((its: any) => its.msg)
      .toString();

    const created_on = it.created_on.slice(0, it.created_on.indexOf('T'));

    const cliente = it.cliente.slice(8, it.cliente.indexOf('\r')).replace(' ', '+');

    const place = it.cliente
      .slice(it.cliente.indexOf('Estabelecimento : ') + 18, it.cliente.indexOf('\r\nTelefone'))
      .toLowerCase()
      .trim();

    const url = format(defaultUrl, "", text, `[${place}]+Chat+com+${cliente}`, created_on, cliente);
    return ({ text, created_on, cliente, place, url }) as ChatMessage
  });
}


export const readFile = (file: any) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => resolve(e?.target?.result);
    fileReader.onerror = (e) => reject(console.log(e));
    fileReader.readAsText(file);
  })
}

export const tarefaPai = parentsIssues.query_result.data.rows.sort((a, b) => {
  if (a.subject.trim().toLowerCase() > b.subject.trim().toLowerCase()) {
    return 1;
  }
  if (a.subject.trim().toLowerCase() < b.subject.trim().toLowerCase()) {
    return -1;
  }
  return 0;
});

/**
 *
 * @param str
 * @param args
 * 0 - parent Id
 * 1 - description
 * 2 - subject
 * 3 - start date
 * 4 contact
 * @returns string
 */
export const format = (str: string, ...args: string[]): string => {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
  });
}


export const defaultUrl = `http://dev.ladsistemas.com.br/redmine/projects/atendimento/issues/new?issue[parent_issue_id]={0}&issue[description]={1}&issue[subject]={2}&issue[start_date]={3}&issue[custom_field_values][13]={4}&issue[tracker_id]=3&issue[assigned_to_id]=27&issue[status_id]=4&issue[priority_id]=2&issue[custom_field_values][59][]=Gerencial+-+dúvidas/relatórios.&issue[custom_field_values][91]=0&issue[custom_field_values][61]=Chat`;

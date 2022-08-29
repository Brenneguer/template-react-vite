import parentsIssues from '../../parent_issue.json';
import { defaultUrl } from './constants';
import { ChatMessage, JsonType } from './types';

export const generateMessage = (json: JsonType): ChatMessage[] => {
  const messages = json.query_result.data.rows;

  return messages.map((it) => {
    const text = JSON.parse(it.text).messages
      .filter((i: any) => i.sender.t === 'v')
      .map((its: any) => its.msg)
      .toString();

    const created_on = it.created_on.slice(0, it.created_on.indexOf('T'));

    const contact = it.cliente.slice(8, it.cliente.indexOf('\r')).replace(' ', '+');

    const placeName = it.cliente
      .slice(it.cliente.indexOf('Estabelecimento : ') + 18, it.cliente.indexOf('\r\nTelefone'))
      .toLowerCase()
      .trim();

    const place = tarefaPai.find((it) => it.subject.trim().toLocaleLowerCase().includes(placeName))?.subject || placeName;

    const cliente = `[${place}] - Chat com ${contact}`;

    const url = format(defaultUrl, "", text, `[${place}]+Chat+com+${cliente}`, created_on, cliente);
    return ({ text, created_on, cliente, place, contact, url }) as ChatMessage
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
 * 4 - contact,
 * 5 - responsavel
 * 6 - motivo suporte
 * @returns string
 */
export const format = (str: string, ...args: string[]): string => {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
  });
}


export const currentDate = new Date(Date.now()).toISOString().slice(0, 10);

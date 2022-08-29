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
  issuesProperties: DefaultIssuesValues,
}

export type ChatMessage = {
  cliente: string,
  place: string,
  text: string,
  created_on: string,
  parentId: string,
  contact: string,
  url: string,
}

export type JsonType = {
  query_result: {
    data: {
      rows: ChatMessage[]
    }
  }
}

export type DefaultIssuesValues = {
  assignedTo: number,
  setAssignedTo: React.Dispatch<React.SetStateAction<number>>
  reason: string | null,
  setReason: React.Dispatch<React.SetStateAction<string | null>>

}

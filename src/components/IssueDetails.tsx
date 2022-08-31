import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import { defaultUrl } from "../utils/constants";
import { currentDate, format, generateMessage, readFile, getLocalStorage, orderTarefaPai } from "../utils/services";
import { IssueDetailsProps, JsonType } from "../utils/types";

import '../style.css';


const IssueDetails = (props: IssueDetailsProps) => {
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(currentDate);
  const [parentId, setParentId] = useState<string>("");
  const [selectedParent, setSelectedParent] = useState<any>({ id: 0, subject: "Selecione a tarefa pai" });
  const [contact, setContact] = useState<string>("");
  const [tarefaPai, setTarefaPai] = useState<any[]>([]);
  const { chatMessage, listIssues, setListIssues, index, issuesProperties } = props;

  useEffect(() => {
    setTarefaPai(orderTarefaPai());

    if (chatMessage.cliente) {
      setSubject(chatMessage.cliente);
    }
    if (chatMessage.text) {
      setDescription(chatMessage.text);
    }
    if (chatMessage.created_on) {
      setDate(chatMessage.created_on);
    }
    if (chatMessage.contact) {
      setContact(chatMessage.contact);
    }
    if (chatMessage.place) {
      let parent = tarefaPai.find((it) => it.subject === chatMessage.place);

      if (parent) {
        setParentId(`${parent.id}`);
        setSelectedParent(parent);
      }
    }
  }, [chatMessage]);

  const handleSetSubject = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSubject(event.target.value);
  };

  const handleSetDescription = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSetDate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDate(event.target.value);
  };

  const handleSetParentId = (event: any, value: any) => {
    if (value && value.id) {
      setParentId(value.id);
      setSelectedParent(value);
    }
  };

  const handleSetContact = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContact(event.target.value);
  };

  const handleSetListIssues = async (event: any) => {
    const file = event.target.files[0];

    const value = await readFile(file) as string;

    const json = JSON.parse(value) as JsonType;
    setListIssues(generateMessage(json));
  }

  const handleCreateMessageChat = () => {
    if (!subject || !description || !parentId) {
      return;
    }

    let newIssue = format(defaultUrl, parentId, description.replaceAll('\n', '%0A'), subject, date, contact, `${issuesProperties.assignedTo}`, `${issuesProperties.reason}`);

    let chatMessage = {
      cliente: subject,
      place: tarefaPai.find((it) => it.id === parseInt(parentId))?.subject || "",
      text: description,
      created_on: date,
      parentId,
      contact,
      url: newIssue,
    };

    if (index !== -1 && listIssues) {
      let list = [...listIssues];
      list[index] = chatMessage;

      setListIssues((prev) => {
        console.log(prev);

        return prev;
      })
    }

    if (listIssues && index === -1) {
      let list = [...listIssues];
      list.push(chatMessage);

      setListIssues(list);
    }

    clearTextInput();
  }

  const clearTextInput = () => {
    setSubject("");
    setDate(currentDate);
    setDescription("");
    setContact("");
    setParentId("");
    setSelectedParent({ id: 0, subject: "Selecione a tarefa pai" });
    issuesProperties.setReason("Gerencial - dúvidas/relatórios.");
  }

  return (
    <Grid container alignItems="center" rowSpacing={3} direction="row">
      <Grid item xs={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-around" alignItems="center" spacing={2}>
          <Autocomplete
            value={selectedParent}
            onChange={(event, value) => handleSetParentId(event, value)}
            isOptionEqualToValue={(option, value) => value === selectedParent}
            options={tarefaPai}
            getOptionLabel={(option) => option.subject}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Tarefa Pai" />}
          />
          <TextField
            id="outlined"
            label="Titulo"
            fullWidth
            value={subject}
            onChange={(event) => handleSetSubject(event)}
          />
          <TextField
            id="outlined"
            label="Contato"
            fullWidth
            value={contact}
            onChange={(e) => handleSetContact(e)}
          />
          <TextField
            id="outlined"
            label="Data"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => handleSetDate(e)}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined"
          label="Descrição do chamado"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => handleSetDescription(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined"
          label="Arquivo com os chats"
          fullWidth
          type="file"
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: "application/json" }}
          onChange={e => handleSetListIssues(e)}
        />
      </Grid>
      <Grid item>
        <Button onClick={handleCreateMessageChat} variant="contained">Gerar chamado</Button>
      </Grid>
    </Grid>
  )
}


export default IssueDetails;

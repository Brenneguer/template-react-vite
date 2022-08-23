import { Autocomplete, Button, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ChangeEvent, useEffect, useState } from "react";
import { ChatMessage, defaultUrl, format, IssueDetailsProps, JsonType, tarefaPai } from "../utils/services";
import { generateMessage, readFile } from '../utils/services';

import '../style.css';

const IssueDetails = (props: IssueDetailsProps) => {
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [parentId, setParentId] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const { chatMessage, listIssues, setListIssues, index } = props;

  useEffect(() => {
    if (chatMessage.place !== "") {
      setSubject(chatMessage.place);
    }
    if (chatMessage.text !== "") {
      setDescription(chatMessage.text);
    }
    if (chatMessage.created_on !== "") {
      setDate(chatMessage.created_on);
    }
    if (chatMessage.cliente !== "") {
      setContact(chatMessage.cliente);
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
    setParentId(value.id);
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
    let newIssue = format(defaultUrl, parentId, description, subject, date, contact);
    let chatMessage = {
      cliente: subject,
      place: subject,
      text: description,
      created_on: date,
      parentId: parentId,
      url: newIssue,
    };

    if (index !== -1 && listIssues) {
      let list = [...listIssues];
      list[index] = chatMessage;

      setListIssues(list);
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
    setDate("");
    setDescription("");
    setContact("");
    setParentId("");
  }

  return (
    <Grid container alignItems="center" rowSpacing={3} direction="row">
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
          <TextField
            id="outlined"
            label="Titulo"
            fullWidth
            value={subject}
            onChange={(event) => handleSetSubject(event)}
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
          <Autocomplete
            id="combo-box-demo"
            options={tarefaPai}
            getOptionLabel={(option) => option.subject}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Tarefa Pai" />}
            onChange={(event, value) => handleSetParentId(event, value)}
            onClick={(e) => {
              e.defaultPrevented = true;
              console.log(e);
            }}
          />
          <TextField
            id="outlined"
            label="Contato"
            fullWidth
            value={contact}
            onChange={(e) => handleSetContact(e)}
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
        <Button onClick={handleCreateMessageChat} variant="contained">Generate</Button>
      </Grid>
    </Grid>
  )
}


export default IssueDetails;

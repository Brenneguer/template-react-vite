import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, Checkbox, createTheme, Grid, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, TextField, ThemeProvider, Typography, useTheme, withStyles } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import FixedValues from './components/FixedValues';
import IssueDetails from './components/IssueDetails';
import './style.css';
import { ChatMessage } from './utils/services';

const theme = createTheme({
  palette: {
    mode: "dark",
  }
});

const initialMessageState = {
  cliente: "",
  place: "",
  text: "",
  created_on: "",
  parentId: "",
  url: "",
}

function App() {
  const [chatMessage, setChatMessage] = useState<ChatMessage>(initialMessageState);
  const [listIssues, setListIssues] = useState<ChatMessage[]>();
  const [checked, setChecked] = useState(-1);

  useEffect(() => {
    if (!listIssues) {
      setListIssues([]);
    }
  })

  const handleSetChecked = (index: number) => {
    checked === -1 ? setChecked(index) :
      listIssues?.indexOf(chatMessage) === index ? setChecked(index) :
        checked === index ? setChecked(-1) : setChecked(index);
  }

  const handleSelectItem = (item: ChatMessage) => {
    setListIssues(listIssues?.filter(it => it !== item));

    setChatMessage(item);
  }

  return (
    <ThemeProvider theme={theme}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">Valores fixos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FixedValues />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Detalhes do Chamado</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <IssueDetails
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            setListIssues={setListIssues}
            listIssues={listIssues}
            index={checked}
          />
        </AccordionDetails>
      </Accordion>
      <Grid container alignItems="center" columnSpacing={4} direction="row">
        <Grid item xs={12}>
          <List>
            {
              listIssues?.map((it, index) => (
                <ListItemButton key={listIssues.indexOf(it)} role={undefined} onClick={() => handleSelectItem(it)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={index === checked}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': it.cliente }}
                      onClick={() => setChecked(index)}
                    />
                  </ListItemIcon>
                  <ListItemText id={it.cliente} primary={<Link rel="noreferrer" underline="none" href={it.url} target="_blank">{<Typography>{it.cliente} {it.text}</Typography>}</Link>} />
                </ListItemButton>
              ))
            }
          </List>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App

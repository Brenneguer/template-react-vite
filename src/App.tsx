import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, CircularProgress, createTheme, Grid, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import FixedValues from './components/FixedValues';
import IssueDetails from './components/IssueDetails';
import './style.css';
import { fetchParentIssues, getLocalStorage } from './utils/services';
import { ChatMessage } from './utils/types';

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
  contact: "",
  url: "",
}

function App() {
  const [chatMessage, setChatMessage] = useState<ChatMessage>(initialMessageState);
  const [listIssues, setListIssues] = useState<ChatMessage[]>();
  const [assignedTo, setAssignedTo] = useState<number>(27);
  const [expandDefaultValues, setExpandDefaultValues] = useState<boolean>(false);
  const [expandIssuesDetails, setExpandIssuesDetails] = useState<boolean>(true);
  const [reason, setReason] = useState<string | null>("Gerencial - dúvidas/relatórios.");
  const [checked, setChecked] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDataParentIds = async () => {
      await fetchParentIssues().then(() => setLoading(false));
    }

    getLocalStorage() === null ?
      getDataParentIds() : setLoading(false);
  }, [setLoading])

  useEffect(() => {
    if (!listIssues) {
      setListIssues([]);
    }
  }, [setListIssues])

  const handleSetChecked = (index: number) => {
    checked === -1 ? setChecked(index) :
      listIssues?.indexOf(chatMessage) === index ? setChecked(index) :
        checked === index ? setChecked(-1) : setChecked(index);
  }

  const handleSelectItem = (chat: ChatMessage) => {
    setListIssues(listIssues?.filter(it => it !== chat));

    setChatMessage(chat);
  }

  const showTable = () => listIssues ? listIssues.length > 0 : false;

  const openIssue = (chat: ChatMessage) => {
    window.open(chat.url, '_blank');

    setListIssues(listIssues?.filter(it => it !== chat));
  }

  return (
    <ThemeProvider theme={theme}>
      {
        loading ? (
          <CircularProgress />
        ) :
          (
            <>
              <Accordion expanded={expandDefaultValues} onChange={() => setExpandDefaultValues(!expandDefaultValues)}>
                <AccordionSummary
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5">Valores fixos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FixedValues assignedTo={assignedTo} setAssignedTo={setAssignedTo} reason={reason} setReason={setReason} />
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expandIssuesDetails} onChange={() => setExpandIssuesDetails(!expandIssuesDetails)}>
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
                    issuesProperties={{ assignedTo, setAssignedTo, reason, setReason }}
                  />
                </AccordionDetails>
              </Accordion>
              {showTable() && (
                <Grid container alignItems="center" columnSpacing={4} direction="row">
                  <Grid item xs={12}>
                    <Box sx={{ width: '100%' }}>
                      <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                          <Table size="medium">
                            <TableHead>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="left">Titulo</TableCell>
                                <TableCell align="left">Estabelecimento</TableCell>
                                <TableCell align="center">link</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                listIssues?.map((it, index) => {
                                  return (
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      aria-checked={checked === index}
                                      tabIndex={-1}
                                      key={it.text + it.parentId + it.place + it.created_on}
                                      selected={checked === index}
                                    >
                                      <TableCell padding="checkbox">
                                        <Checkbox
                                          edge="start"
                                          checked={checked === index}
                                          tabIndex={-1}
                                          disableRipple
                                          inputProps={{ 'aria-labelledby': it.cliente }}
                                          onClick={() => handleSetChecked(index)}
                                        />
                                      </TableCell>
                                      <TableCell component="th"
                                        id={it.cliente}
                                        scope="row"
                                        onClick={() => handleSelectItem(it)}>
                                        {it.cliente}
                                      </TableCell>
                                      <TableCell component="th"
                                        id={it.place}
                                        scope="row"
                                        onClick={() => handleSelectItem(it)}>
                                        {it.place}
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        align="center"
                                        id={it.parentId}
                                        scope="row"
                                      >
                                        <Button>
                                          <Link underline='none' href={it.url} target='_blank' variant='button'>Abrir Tarefa</Link>
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  )
                                })
                              }
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Box>
                  </Grid>
                </Grid>)
              }
            </>)}
    </ThemeProvider >
  )
}

export default App

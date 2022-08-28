import { Autocomplete, Grid, MenuItem, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { DefaultIssuesValues, reasonSupport, users } from "../utils/services";

const FixedValues = (props: DefaultIssuesValues) => {
  const { assignedTo, setAssignedTo, reason, setReason } = props;
  const listUsers = users;

  const handleSelectUser = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = event.target.value;
    if (typeof value === 'number') {
      setAssignedTo(value);
    }
  }

  const handleChangeReason = (event: any, value: string | null) => {
    setReason(value);
  }

  return (
    <Grid container alignItems="center" rowSpacing={3} direction="row">
      <Grid item xs={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-around" alignItems="center" spacing={2}>
          <TextField
            id="outlined"
            label="Tipo"
            fullWidth
            value='Suporte'
            disabled
          />
          <TextField
            id="outlined"
            label="Responsável"
            fullWidth
            select
            InputLabelProps={{ shrink: true }}
            value={assignedTo}
            onChange={(e) => handleSelectUser(e)}
          >
            {
              listUsers.map((it) => (
                <MenuItem key={it.id} value={it.id}>
                  {it.nome}
                </MenuItem>
              ))
            }
          </TextField>
          <TextField
            id="outlined"
            label="Status"
            fullWidth
            value='Finalizada'
            disabled
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-around" alignItems="center" spacing={2}>
          <TextField
            id="outlined"
            label="Prioridade"
            fullWidth
            value='Normal'
            disabled
          />
          <Autocomplete
            value={reason}
            isOptionEqualToValue={(option, value) => value === reason}
            options={reasonSupport}
            getOptionLabel={(option) => option}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Motivo Suporte" />}
            onChange={(event, value) => handleChangeReason(event, value)}
          />
          <TextField
            id="outlined"
            label="Origem"
            fullWidth
            value='Chat'
            disabled
          />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default FixedValues;

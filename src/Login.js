import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Login() {
  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: 'black'  }}>
        <AppBar position="static"sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wellmeadows Hospital
            </Typography>
            <Button sx={{ color: 'white' }}>Log In</Button>
            <Button sx={{ color: 'white' }}>Sign Up</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-email"
          label="Email"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-password"
          label="Password"
          type="password"
          defaultValue=""
        />
        <Grid item xs={12}>
                <FormControlLabel
                 control={<Checkbox value="allowExtraEmails" sx={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
                  label="save my password"
                />
        </Grid>
        <Button variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'black', color: 'white' }}>Log In</Button>
      </Box>
    </>
  );
}

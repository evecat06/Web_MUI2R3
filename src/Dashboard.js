import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, yellow, green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: purple[200],  
    },
    secondary: {
      main: green[400],  
    },
    text: {
      primary: purple[900],
      secondary: yellow[900],
    },
  },
});

export default function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1, backgroundColor: 'black' }}>
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography color='white' variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wellmeadows Hospital
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleMenuClick}>
              Account
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={Link} to="/profile">Profile</MenuItem>
              <MenuItem component={Link} to="/">Log out</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </ThemeProvider>
  );
}

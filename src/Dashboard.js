import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, Menu, MenuItem, List, ListItem, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, yellow, green } from '@mui/material/colors';

import supabase from './supabaseClient'; // Import Supabase client
import Appointment from './Appointment'; // Import the Appoinment component

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
  const [userData, setUserData] = useState(null);
  const [view, setView] = useState('dashboard'); // State to manage the view

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAppointmentButtonClick = () => {
    setView('Appointment'); // Change the view to features
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user) {
        const { data: userProfile } = await supabase
          .from('Userlogin')
          .select('*')
          .eq('id', user.id)
          .single();
        setUserData(userProfile);
      }
    };
    fetchUserData();
  }, []);

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  const wordOfTheDayCard = (
    <Card variant="outlined" sx={{ minWidth: 275, margin: 2 }}>
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
    </Card>
  );

  const patientStatsCard = (
    <Card variant="outlined" sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Patient Statistics
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Total Patients: 120
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Admitted Today: 10
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Discharged Today: 5
        </Typography>
      </CardContent>
    </Card>
  );

  const recentActivitiesCard = (
    <Card variant="outlined" sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Recent Activities
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="John Doe admitted" secondary="2 hours ago" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Jane Smith discharged" secondary="3 hours ago" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dr. Brown's surgery completed" secondary="4 hours ago" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  const announcementsCard = (
    <Card variant="outlined" sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Announcements
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Staff meeting at 3 PM" />
          </ListItem>
          <ListItem>
            <ListItemText primary="New COVID-19 protocols" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Upcoming health fair on Saturday" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  const welcomeUserCard = userData && (
    <Card variant="outlined" sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Welcome, {userData.fname} {userData.lname}
        </Typography>
      </CardContent>
    </Card>
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
      <Box sx={{ padding: 4 }}>
        {view === 'dashboard' ? (
          <>
            <Grid item xs={12} md={6}>
              {welcomeUserCard}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {wordOfTheDayCard}
              </Grid>
              <Grid item xs={12} md={6}>
                {patientStatsCard}
              </Grid>
              <Grid item xs={12} md={6}>
                {recentActivitiesCard}
              </Grid>
              <Grid item xs={12} md={6}>
                {announcementsCard}
              </Grid>
              <Grid item xs={12} md={6}>
                <Button variant="contained" color="primary" onClick={handleAppointmentButtonClick}>
                  Availability
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <Appointment />
        )}
      </Box>
    </ThemeProvider>
  );
}

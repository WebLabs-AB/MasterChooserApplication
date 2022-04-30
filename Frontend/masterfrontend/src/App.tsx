import React from 'react';
import logo from './logo.svg';
import {Stack} from '@mui/material';

import './App.css';
import { RegistrationPage } from './Screens/RegistrationPage';
import {Colors} from './Assets/Colors';

function App() {
  return (
    <Stack
      sx={{height: '100vh', display: 'flex', flexDirection: 'column',
        bgcolor: Colors.lightGreen, marginLeft: 0, marginRight: 0, padding: 0,
      }}
    >
    <RegistrationPage/>
    </Stack>
  );
}

export default App;

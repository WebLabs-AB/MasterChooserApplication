import React from 'react';
import logo from './logo.svg';
import {Stack} from '@mui/material';

import './App.css';
import { RegistrationPage } from './Screens/RegistrationPage';

function App() {
  return (
    <Stack
      sx={{height: '100vh', display: 'flex', flexDirection: 'column',
        bgcolor: '#8bc34a', marginLeft: 0, marginRight: 0, padding: 0,
      }}
    >
    <RegistrationPage/>
    </Stack>
  );
}

export default App;

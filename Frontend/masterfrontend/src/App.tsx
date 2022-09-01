import {Stack} from '@mui/material';

import './App.css';

import {Colors} from './Assets/Colors';
import Main from './Main';

function App() {
  return (
    <Stack
      sx={{height: '100vh', display: 'flex', flexDirection: 'column',
        bgcolor: Colors.lightGreen, marginLeft: 0, marginRight: 0, padding: 0,
      }}
    >
    <Main/>
    </Stack>
  );
}

export default App;
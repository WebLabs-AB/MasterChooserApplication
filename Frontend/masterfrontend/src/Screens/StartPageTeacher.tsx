import { useEffect, useState } from 'react';
import {Container, Paper, Button, FormHelperText, Snackbar, Alert, Stack} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useQuery, useLazyQuery } from '@apollo/client';

// Own files.
import { Colors } from '../Assets/Colors';
import { useNavigate } from 'react-router-dom';

export const StartPageTeacher: React.FC = () => {

    const navigate = useNavigate();
    const handleGoToMainMenu = () => navigate("/");

    return(
        <Container
            sx={{flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', width: '100vw'}}
        >
            <Paper 
                elevation={0}
                sx={{display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    width: '85vw', maxWidth: '400px', padding: '20px',
                    backgroundColor: Colors.transparentWhite}}>
                
                <Button 
                    onClick={handleGoToMainMenu}
                    variant="contained"
                    sx={{'width': '80vw', 'maxWidth': '200px',
                    'backgroundColor': Colors.cyan,
                    ':hover': {backgroundColor: Colors.cyan}}}
                >
                    Back
                </Button>
            </Paper>
        </Container>
    );

};
import { useState } from 'react';
import {Container, Paper, Button} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { PasswordInputField } from '../Components/PasswordInputField';
import { UsernameInputField } from '../Components/EmailInputField';

import {Colors} from '../Assets/Colors';

export const RegistrationPage: React.FC = () => {    
    const passwordFieldId = "outlined-adornment-password";
    const emailFieldId = "outlined-email";
    
    return (
    <Container
        sx={{flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', width: '100vw'}}>
        <Paper 
            elevation={0}
            sx={{display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                width: '85vw', maxWidth: '400px', padding: '20px',
                backgroundColor: Colors.transparentWhite}}>

            <FormControl 
                sx={{m: 1, width: '80vw', marginTop: '1vh',
                marginBottom: '1vh', maxWidth: '400px'}} variant="outlined"
            >
                <InputLabel htmlFor={emailFieldId}>
                    Email
                </InputLabel>
                <UsernameInputField id={emailFieldId}/>
            </FormControl>

            <FormControl 
                sx={{m: 1, width: '80vw',
                marginBottom: '2vh', maxWidth: '400px'}} variant="outlined"
            >
                <InputLabel htmlFor={passwordFieldId}>
                    Password
                </InputLabel>
                <PasswordInputField id={passwordFieldId}/>
            </FormControl>

            <Button 
                variant="contained"
                sx={{'width': '80vw', 'maxWidth': '400px',
                'backgroundColor': Colors.cyan,
                ':hover': {backgroundColor: Colors.cyan}}}
            >
                Register Account
            </Button>
        </Paper>
    </Container>
    );
};
    
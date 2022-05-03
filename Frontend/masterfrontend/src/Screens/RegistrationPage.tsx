import { useState, useEffect } from 'react';
import {Container, Paper, Button, FormHelperText} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { PasswordInputField } from '../Components/PasswordInputField';
import { UsernameInputField } from '../Components/EmailInputField';

import {Colors} from '../Assets/Colors';

export const RegistrationPage: React.FC = () => {
    
    // Hooks used for password checks
    const [errorMessage, seterrorMessage] = useState("");

    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });

    // Hooks used for email checks
    
    // Constants
    const passwordFieldId = "outlined-adornment-password";
    const emailFieldId = "outlined-email";
    const requiredLength = 8;

    const handleClickShowPassword = () => {
        setValues({
        ...values,
        showPassword: !values.showPassword,
        });
    };

    const isPasswordOk = (inputtedPassword: string) => {
        const isLengthOk = inputtedPassword.length >= requiredLength ? true : false;
        if (!isLengthOk) return false;

        const containsNumber = /\d/.test(inputtedPassword);
        if (!containsNumber) return false;

        const containsUpperLetter = inputtedPassword.toLowerCase() !== inputtedPassword;
        if (!containsUpperLetter) return false;

        const containsLowerLetter = inputtedPassword.toUpperCase() !== inputtedPassword;
        if (!containsLowerLetter) return false;

        return true;
    }

    const handleChange = () => (event: { target: { value: any; }; }) => {
        if(isPasswordOk(event.target.value)) {
            setValues({...values, password: event.target.value});
            seterrorMessage("")
        }
        else {
            setValues({...values, password: event.target.value});
            seterrorMessage("Password must have more than 7 characters, capital letter and a number")
        }
    };

    return (
    <Container
        sx={{flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', width: '100vw'}}>
        <h1>Registration</h1>
        <Paper 
            elevation={0}
            sx={{display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                width: '85vw', maxWidth: '400px', padding: '20px',
                backgroundColor: Colors.transparentWhite}}>

            <FormControl 
                sx={{m: 1, width: '80vw', marginTop: '1vh',
                marginBottom: '1vh', maxWidth: '400px'}}
                variant="outlined"
            >
                <InputLabel htmlFor={emailFieldId}>
                    Email
                </InputLabel>
                <UsernameInputField id={emailFieldId}/>
            </FormControl>

            <FormControl 
                sx={{m: 1, width: '80vw', marginTop: '1vh',
                marginBottom: '1vh', maxWidth: '400px'}}
                variant="outlined"
            >
                <InputLabel htmlFor={passwordFieldId}>
                    Password
                </InputLabel>
                <PasswordInputField 
                    id={passwordFieldId}
                    handleChange={handleChange}
                    handleClickShowPassword={handleClickShowPassword}
                    values={values}
                />
                <FormHelperText error id="error-text-password">{errorMessage}</FormHelperText>
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
    
import { useState } from 'react';
import {Container, Paper, Button, FormHelperText, Snackbar, Alert} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { PasswordInputField } from '../Components/PasswordInputField';
import { UsernameInputField } from '../Components/EmailInputField';

import {Colors} from '../Assets/Colors';
import { REQUIRED_PASSWORD_LENGTH, PASSWORD_ERROR_MESSAGE, EMAIL_ERROR_MESSAGE, SNACKBAR_REGISTER_ERROR_MSG } from '../Assets/Constants';

export const RegistrationPage: React.FC = () => {
    
    // Hooks used for password checks
    const [passwordErrorField, setPasswordErrorField] = useState("");
    const [password, setPassword] = useState("");
    const [passwordOk, setPasswordOk] = useState(false);

    // Hooks used for email checks
    const [emailErrorField, setEmailErrorField] = useState("");
    const [email, setEmail] = useState("");
    const [emailOk, setEmailOk] = useState(false);

    //Used for snackbar
    const [open, setOpen] = useState(false);
    
    // Constants
    const passwordFieldId = "outlined-adornment-password";
    const emailFieldId = "outlined-email";

    const handleClose = () => {
        setOpen(false);
    };

    const openSnackBar = () => {
        setOpen(true);
    };
    
    const isPasswordOk = (inputtedPassword: string): boolean => {
        const isLengthOk = inputtedPassword.length >= REQUIRED_PASSWORD_LENGTH ? true : false;
        if (!isLengthOk) return false;

        const containsNumber = /\d/.test(inputtedPassword);
        if (!containsNumber) return false;

        const containsUpperLetter = inputtedPassword.toLowerCase() !== inputtedPassword;
        if (!containsUpperLetter) return false;

        const containsLowerLetter = inputtedPassword.toUpperCase() !== inputtedPassword;
        if (!containsLowerLetter) return false;

        return true;
    };

    const isEmailOk = (inputtedEmail: string): boolean  => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(regex.test(inputtedEmail)) { // Valid email
            setEmailErrorField("");
            return true;
        }else {
            setEmailErrorField(EMAIL_ERROR_MESSAGE);
            return false;
        }
    };

    const handleInputtedPassword = () => (event: { target: { value: string; }; }) => {
        if (event.target.value.length === 0) {
            setPasswordErrorField(""); // Null value was inputted, field is empty.
            setPassword(event.target.value);
            setPasswordOk(false); 
        }
        else{
            if(isPasswordOk(event.target.value)) {
                setPassword(event.target.value);
                setPasswordErrorField("");
                setPasswordOk(true); 
            }
            else {
                setPassword(event.target.value);
                setPasswordErrorField(PASSWORD_ERROR_MESSAGE);
                setPasswordOk(false); 
            }
        }
    };

    const handleInputtedEmail = () => (event: { target: { value: string }; }) => {
        if (event.target.value.length === 0){
            setEmailErrorField(""); // Null value was inputted, field is empty.
            setEmail(event.target.value);
            setEmailOk(false); 
        }
        else{
            if(isEmailOk(event.target.value)) {
                setEmail(event.target.value);
                setEmailErrorField("");
                setEmailOk(true); 
            }
            else {
                setEmail(event.target.value);
                setEmailErrorField(EMAIL_ERROR_MESSAGE);
                setEmailOk(false); 
            }
        }
    };

    const registerUser = () => {
        if((emailOk || passwordOk) === false) {
            openSnackBar();
        }
        else {
            // Send post-request to backend
        }
    };

    return (
    <Container
        sx={{flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', width: '100vw'}}
    >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'center'}} sx={{marginTop: '7vh'}}
        >
            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                {SNACKBAR_REGISTER_ERROR_MSG}
            </Alert>
        </Snackbar>

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
                <UsernameInputField
                    id={emailFieldId}
                    email={email}
                    handleChange={handleInputtedEmail}
                />
                <FormHelperText error id="error-text-email">{emailErrorField}</FormHelperText>
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
                    handleChange={handleInputtedPassword}
                    password={password}
                />
                <FormHelperText error id="error-text-password">{passwordErrorField}</FormHelperText>
            </FormControl>

            <Button 
                onClick={registerUser}
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
    
import { useState } from 'react';
import {Container, Paper, Button, FormHelperText, Snackbar, Alert} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// Own files.
import { PasswordInputField } from '../Components/PasswordInputField';
import { UsernameInputField } from '../Components/EmailInputField';
import { SelectMenuList } from '../Components/SelectMenuList';
import {Colors} from '../Assets/Colors';
import { SNACKBAR_REGISTER_ERROR_MSG } from '../Assets/Constants';

export const RegistrationPage: React.FC = () => {
    
    // Hooks used for password checks
    const [passwordErrorField, setPasswordErrorField] = useState("");
    const [password, setPassword] = useState("");
    const [passwordOk, setPasswordOk] = useState(false);

    // Hooks used for email checks
    const [emailErrorField, setEmailErrorField] = useState("");
    const [email, setEmail] = useState("");
    const [emailOk, setEmailOk] = useState(false);

    // Hooks used for starting year selectmenulist
    const [startingYear, setStartingYear] = useState("");
    const [startingYearOk, setStartingYearOk] = useState(false);

    // Hooks used for university selectmenulist
    const [university, setUniversity] = useState("");
    const [universityOk, setUniversityOk] = useState(false);

    // Used for snackbar
    const [open, setOpen] = useState(false);
    
    // Constants
    const passwordFieldId = "outlined-adornment-password";
    const emailFieldId = "outlined-email";

    // Starting year selectmenulist id's
    const startingYearMenuLabelId = "simple-starting-year-label";
    const startingYearMenuId = "simple-starting-year-id";
    const startingYearOutlinedLabel= "StartingYear";
    const startingYearInputLabelId = "simple-starting-year-inputlabel"

    // University selectmenulist id's
    const universityMenuLabelId = "simple-university-label";
    const universityMenuId = "simple-university-id";
    const universityOutlinedLabel= "University";
    const universityInputLabelId = "simple-university-inputlabel"

    const startingYearsList = [
        '2019',
        '2020',
        '2021',
        '2022',
    ];

    const universityList = [
        'Linköpings Universitet',
        'Chalmers',
    ];

    const handleClose = () => {
        setOpen(false);
    };

    const openSnackBar = () => {
        setOpen(true);
    };
    
    const registerUser = () => {

        if(emailOk === false || passwordOk === false || startingYearOk === false || universityOk === false) {
            openSnackBar();
        }
        else {
            // Send post-request to backend
            console.log(email);
            console.log(password);
            console.log(startingYear);
            console.log(university);
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
                    setEmailErrorField={setEmailErrorField}
                    setEmail={setEmail}
                    setEmailOk={setEmailOk}
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
                    password={password}
                    setPasswordErrorField={setPasswordErrorField}
                    setPassword={setPassword}
                    setPasswordOk={setPasswordOk}
                />
                <FormHelperText error id="error-text-password">{passwordErrorField}</FormHelperText>
            </FormControl>

            <FormControl 
                sx={{m: 1, width: '80vw', marginTop: '1vh',
                marginBottom: '1vh', maxWidth: '400px'}}
                variant="outlined"
            >
                <InputLabel id={startingYearInputLabelId}>Year</InputLabel>

                <SelectMenuList 
                    id={startingYearMenuId}
                    labelId={startingYearMenuLabelId}
                    value={startingYear}
                    outlinedLabel={startingYearOutlinedLabel}
                    valueList={startingYearsList}
                    setValue={setStartingYear}
                    setValueOk={setStartingYearOk}
                />
                <FormHelperText>Choose the year you started university</FormHelperText>
            </FormControl>

            <FormControl 
                sx={{m: 1, width: '80vw', marginTop: '1vh',
                marginBottom: '1vh', maxWidth: '400px'}}
                variant="outlined"
            >
                <InputLabel id={universityInputLabelId}>University</InputLabel>

                <SelectMenuList 
                    id={universityMenuId}
                    labelId={universityMenuLabelId}
                    value={university}
                    outlinedLabel={universityOutlinedLabel}
                    valueList={universityList}
                    setValue={setUniversity}
                    setValueOk={setUniversityOk}
                />
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
    
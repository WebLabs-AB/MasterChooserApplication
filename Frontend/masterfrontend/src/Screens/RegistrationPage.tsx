import { useEffect, useState } from 'react';
import {Container, Paper, Button, FormHelperText, Snackbar, Alert} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useQuery, useLazyQuery } from '@apollo/client';

// Own files.
import { PasswordInputField } from '../Components/PasswordInputField';
import { UsernameInputField } from '../Components/EmailInputField';
import { SelectMenuList } from '../Components/SelectMenuList';
import { Colors } from '../Assets/Colors';
import { SNACKBAR_REGISTER_DUPLICATE_MSG, SNACKBAR_REGISTER_ERROR_MSG } from '../Assets/Constants';
import { CHECK_IF_REGULAR_USER_EXISTS, GET_ALL_STARTING_YEARS, GET_ALL_UNIVERSITIES, GET_UNIVERSITY_EDUCATIONS } from '../gql/Query';
import { educationJsonType, startingYearJsonType, universityJsonType } from '../Assets/Interfaces';
import { useNewRegularUserMutation } from '../gql/RegUserMut';

export const RegistrationPage: React.FC = () => {

    // Hook for creating new RegularUser
    const setNewRegularUser = useNewRegularUserMutation();
    
    // Hooks used for password checks.
    const [passwordErrorField, setPasswordErrorField] = useState("");
    const [password, setPassword] = useState("");
    const [passwordOk, setPasswordOk] = useState(false);

    // Hooks used for email checks.
    const [emailErrorField, setEmailErrorField] = useState("");
    const [email, setEmail] = useState("");
    const [emailOk, setEmailOk] = useState(false);
    const [duplicateEmail, setDuplicateEmail] = useState(false);

    // Hooks used for starting year selectmenulist.
    const [startingYear, setStartingYear] = useState("");
    const [startingYearOk, setStartingYearOk] = useState(false);
    const [startingYears, setStartingYears] = useState([""]);

    // Hooks used for university selectmenulist.
    const [chosenUniversity, setUniversity] = useState("");
    const [universityOk, setUniversityOk] = useState(false);
    const [universities, setUniversities] = useState([""]);

    // Hooks used for education selectmenulist.
    const [chosenEducation, setEducation] = useState("");
    const [educationOk, setEducationOk] = useState(false);
    const [educations, setEducations] = useState([""]);

    // Used for snackbar.
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    // GraphQL hooks.
    const [getUniversities] = useLazyQuery(GET_ALL_UNIVERSITIES, {
        variables: { chosenUniversity }, // Execute query when chosenUniversity hook is changed.
        onCompleted: data => {
            let universityArray: string[] = [];
            data.universities.map((uni: universityJsonType) => universityArray.push(uni.universityName));
            setUniversities(universityArray);
        },
        onError: error => {
            console.log(error);
        }
    });

    const [getUniversityEducation] = useLazyQuery(GET_UNIVERSITY_EDUCATIONS, {
        onCompleted: data => {
            let educationArray: string[] = [];
            data.educationFromUniversity.map((education: educationJsonType) => educationArray.push(education.educationName));
            setEducations(educationArray);
        },
        onError: error => {
            console.log(error);
        }
    });

    const [getRegularuser] = useLazyQuery(CHECK_IF_REGULAR_USER_EXISTS, {
        fetchPolicy: 'no-cache',
        onCompleted: () => { // Email does exist in the database.
            setDuplicateEmail(true);
        },
        notifyOnNetworkStatusChange: true, 
        onError: () => { // Email does not exist in the database.
            setDuplicateEmail(false);
        }
    })

    const { data } = useQuery(GET_ALL_STARTING_YEARS, {
        onCompleted: data => {
            let startingYearsArray: string[] = [];
            data.startingYears.map((year: startingYearJsonType) => startingYearsArray.push(year.startingYear));
            setStartingYears(startingYearsArray);
        }
    });

    // Updates the screen when choices are made.
    useEffect(() => {
        getUniversities();
        if(universityOk) getUniversityEducation({variables: {universityName: chosenUniversity}});
        
    }, [getUniversities, chosenUniversity, universityOk, getUniversityEducation])
    
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

    // Education selectmenulist id's
    const educationMenuLabelId = "simple-education-label";
    const educationMenuId = "simple-education-id";
    const educationOutlinedLabel= "Education";
    const educationInputLabelId = "simple-education-inputlabel"

    const handleClose = () => {
        setOpen(false);
    };

    const openSnackBar = (msg: string) => {
        setOpen(true);
        setMsg(msg);
    };
    
    const registerUser = async () => {

        if(emailOk === false || passwordOk === false || startingYearOk === false || universityOk === false || educationOk === false) {
            openSnackBar(SNACKBAR_REGISTER_ERROR_MSG);
        }
        else {         
            // Check if email is already taken before trying to register.
            getRegularuser({variables: {email: email}});
            if(duplicateEmail) {
                openSnackBar(SNACKBAR_REGISTER_DUPLICATE_MSG);
                setEmailErrorField("Email already exists");
            }

            await setNewRegularUser(email, password, Number(startingYear), chosenUniversity, chosenEducation)
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
                {msg}
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
                    disabled={false}
                    valueList={startingYears}
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
                    value={chosenUniversity}
                    outlinedLabel={universityOutlinedLabel}
                    disabled={false}
                    valueList={universities}
                    setValue={setUniversity}
                    setValueOk={setUniversityOk}
                />
            </FormControl>

            <FormControl 
                sx={{m: 1, width: '80vw', marginTop: '1vh',
                marginBottom: '1vh', maxWidth: '400px'}}
                variant="outlined"
            >
                <InputLabel id={educationInputLabelId}>Education</InputLabel>

                <SelectMenuList 
                    id={educationMenuId}
                    labelId={educationMenuLabelId}
                    value={chosenEducation}
                    outlinedLabel={educationOutlinedLabel}
                    disabled={!universityOk}
                    valueList={educations}
                    setValue={setEducation}
                    setValueOk={setEducationOk}
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
    
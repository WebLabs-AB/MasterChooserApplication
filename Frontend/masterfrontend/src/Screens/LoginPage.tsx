import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { Colors } from "../Assets/Colors";
import { UsernameInputField } from "../Components/EmailInputField";
import { PasswordInputField } from "../Components/PasswordInputField";

export const LoginPage: React.FC = () => {

    // Hooks used for password checks.
    const [password, setPassword] = useState("");

    // Hooks used for email checks.
    const [email, setEmail] = useState("");

    // Used for snackbar.
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    // Constants
    const passwordFieldId = "outlined-adornment-password";
    const emailFieldId = "outlined-email";
    
    const handleClose = () => {
        setOpen(false);
    };

    const openSnackBar = (msg: string) => {
        setOpen(true);
        setMsg(msg);
    };

    const loginUser = async () => {

        console.log("Login is accepted")
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
    
            <h1>Login</h1>
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
                        setEmail={setEmail}
                    />
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
                        setPassword={setPassword}
                    />
                </FormControl>
    
                <Button 
                    onClick={loginUser} 
                    variant="contained"
                    sx={{'width': '80vw', 'maxWidth': '400px',
                    'backgroundColor': Colors.cyan,
                    ':hover': {backgroundColor: Colors.cyan}}}
                >
                    Login
                </Button>
            </Paper>
        </Container>
        );
}
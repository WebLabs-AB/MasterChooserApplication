import { useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import {Colors} from '../Assets/Colors';
import { PASSWORD_ERROR_MESSAGE, REQUIRED_PASSWORD_LENGTH } from '../Assets/Constants';


interface Props {
    id: string;
    password: string;
    setPasswordErrorField: any;
    setPassword: any;
    setPasswordOk: any;
}

export const PasswordInputField: React.FC<Props> = ({id, password, setPasswordErrorField, setPassword, setPasswordOk}) => {
    const [showPassword, setShowpassword] = useState(false);

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowpassword(!showPassword);
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

    const handleInputtedPassword = (event: { target: { value: string }; }) => {
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

    return (
        <OutlinedInput
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleInputtedPassword}
                sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
                endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
                }
                label="Password"
            />    
    );
};
import { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import {Colors} from '../Assets/Colors';
import FormHelperText from '@mui/material/FormHelperText';

interface Props {
    id: string;
    sx: any;
}

export const PasswordInputField: React.FC<Props> = ({id, sx}) => {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });
      
    const [errorMessage, seterrorMessage] = useState("");
    const [validLength, setValidLength] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const requiredLength = 8;

    const handleClickShowPassword = () => {
        setValues({
        ...values,
        showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
    
    const handleChange = () => (event: { target: { value: any; }; }) => {
        setValues({...values, password: event.target.value});
        seterrorMessage("WRONG");
    };

    useEffect(() => {
        setValidLength(values.password.length >= requiredLength ? true : false);
        setUpperCase(values.password.toLowerCase() !== values.password);
        setLowerCase(values.password.toUpperCase() !== values.password);
        setHasNumber(/\d/.test(values.password));  
      }, [values, requiredLength]);
     
    return (
        <FormControl 
            sx={sx}
            variant="outlined"
        >
            <InputLabel htmlFor={id}>
            Password
            </InputLabel>

            <OutlinedInput
                id={id}
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange()}
                sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
                endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
            <FormHelperText error id="error-text-password">{errorMessage}</FormHelperText>
        </FormControl>      
    );
};
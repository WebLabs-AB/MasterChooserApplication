import { useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import {Colors} from '../Assets/Colors';


interface Props {
    id: string;
    handleChange: any;
    password: string;
}

export const PasswordInputField: React.FC<Props> = ({id, handleChange, password}) => {
    const [showPassword, setShowpassword] = useState(false);

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => {
        setShowpassword(!showPassword);
    };
    
    return (
        <OutlinedInput
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={password}
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
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
                }
                label="Password"
            />    
    );
};
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {Colors} from '../Assets/Colors';

interface Props {
    id: string;
}

export const PasswordInputField: React.FC<Props> = ({id}) => {
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
      });

    const handleClickShowPassword = () => {
        setValues({
        ...values,
        showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
    
    const handleChange = (prop: string) => (event: { target: { value: any; }; }) => {
        setValues({...values, [prop]: event.target.value});
    };
     
    return (
        <OutlinedInput
            id={id}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
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
    );
};
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';

import {Colors} from '../Assets/Colors';

interface Props {
    id: string;
}

export const UsernameInputField: React.FC<Props> = ({id}) => {
    const [email, setEmail] = useState<number | string>();

    const handleChange = () => (event: { target: { value: number | string; }; }) => {
        setEmail(event.target.value);
    };
     
    return (
        <OutlinedInput
            id={id}
            value={email}
            onChange={handleChange()}
            sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
            label="Email"
        />
    );
};
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';

import {Colors} from '../Assets/Colors';

interface Props {
    id: string;
}

export const UsernameInputField: React.FC<Props> = ({id}) => {
    const [username, setUsername] = useState<number | string>();

    const handleChange = () => (event: { target: { value: number | string; }; }) => {
        setUsername(event.target.value);
    };
     
    return (
        <OutlinedInput
            id={id}
            value={username}
            onChange={handleChange()}
            sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
            label="Password"
        />
    );
};
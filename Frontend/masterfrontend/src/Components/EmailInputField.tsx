import OutlinedInput from '@mui/material/OutlinedInput';

import {Colors} from '../Assets/Colors';

interface Props {
    id: string;
    email: string;
    handleChange: any;
}

export const UsernameInputField: React.FC<Props> = ({id, email, handleChange}) => {
     
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
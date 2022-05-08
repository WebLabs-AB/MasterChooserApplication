import OutlinedInput from "@mui/material/OutlinedInput";

// Own files.
import {Colors} from '../Assets/Colors';

interface Props {
    startingYear: Number;
    id: string;
    handleChange: any;
}

export const NumericInputField: React.FC<Props> = ({ id, startingYear, handleChange }) => {
    return (
        <OutlinedInput
            id={id}
            value={startingYear}
            onChange={handleChange()}
            sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
            label="Year you started university"
        />
    );
}
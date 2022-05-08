import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Own files.
import {Colors} from '../Assets/Colors';

interface Props {
  id: string;
  labelId: string;
  startingYear: string;
  setStartingYear: any;
  setStartingYearOk: any;
}

export const NumericInputField: React.FC<Props> = ({ id, labelId, startingYear, setStartingYear, setStartingYearOk}) => {

    const handleChange = (event: SelectChangeEvent) => {
      setStartingYear(event.target.value);
      setStartingYearOk(true);
    };

    return (
      <Select
        labelId={id}
        id={labelId}
        value={startingYear}
        label="StartingYear"
        onChange={handleChange}
        sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
      >
        <MenuItem value={2019}>2019</MenuItem>
        <MenuItem value={2020}>2020</MenuItem>
        <MenuItem value={2021}>2021</MenuItem>
        <MenuItem value={2022}>2022</MenuItem>
    </Select>
    );
}
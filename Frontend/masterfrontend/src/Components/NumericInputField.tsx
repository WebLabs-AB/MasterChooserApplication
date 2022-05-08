import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// Own files.
import {Colors} from '../Assets/Colors';

export const NumericInputField: React.FC = () => {
    return (
        <FormControl sx={{m: 1, width: '80vw', marginTop: '1vh',
        marginBottom: '1vh', maxWidth: '400px'}}
        variant="outlined">
        <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>

        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          // value={}
          label="StartingYear"
          // onChange={}
          sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <FormHelperText>Choose year you started university</FormHelperText>
      </FormControl>
    );
}
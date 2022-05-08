import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// Own files.
import {Colors} from '../Assets/Colors';


interface Props {
  id: string;
  labelId: string;
  value: string;
  outlinedLabel: string;
  valueList: any;
  setValue: any;
  setValueOk: any;
}

export const SelectMenuList: React.FC<Props> = ({ id, labelId, value, outlinedLabel, valueList, setValue, setValueOk}) => {

    const handleChange = (event: SelectChangeEvent) => {
      setValue(event.target.value);
      setValueOk(true);
    };

    return (
      <Select
        labelId={id}
        id={labelId}
        value={value}
        label={outlinedLabel}
        onChange={handleChange}
        sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
      >
        {valueList.map((item: string)=> (
            <MenuItem
              key={item}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
    </Select>
    );
}
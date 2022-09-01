import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SetStateAction } from "react";

// Own files.
import {Colors} from '../Assets/Colors';


interface Props {
  id: string;
  labelId: string;
  value: string;
  outlinedLabel: string;
  disabled: boolean;
  valueList: string[];
  setValue: (value: SetStateAction<string>) => void;
  setValueOk: (value: SetStateAction<boolean>) => void;
}

export const SelectMenuList: React.FC<Props> = ({ id, labelId, value, outlinedLabel, disabled, valueList, setValue, setValueOk}) => {

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
        disabled={disabled}
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
import OutlinedInput from '@mui/material/OutlinedInput';

// Own files.
import {Colors} from '../Assets/Colors';
import { EMAIL_ERROR_MESSAGE } from '../Assets/Constants';

interface Props {
    id: string;
    email: string;
    setEmailErrorField: any;
    setEmail: any;
    setEmailOk: any;
}

export const UsernameInputField: React.FC<Props> = ({id, email, setEmailErrorField, setEmail, setEmailOk}) => {

    const isEmailOk = (inputtedEmail: string): boolean  => {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(regex.test(inputtedEmail)) { // Valid email
            setEmailErrorField("");
            return true;
        }else {
            setEmailErrorField(EMAIL_ERROR_MESSAGE);
            return false;
        }
    };

    const handleInputtedEmail = (event: { target: { value: string }; }) => {
        if (event.target.value.length === 0){
            setEmailErrorField(""); // Null value was inputted, field is empty.
            setEmail(event.target.value);
            setEmailOk(false); 
        }
        else{
            if(isEmailOk(event.target.value)) {
                setEmail(event.target.value);
                setEmailErrorField("");
                setEmailOk(true); 
            }
            else {
                setEmail(event.target.value);
                setEmailErrorField(EMAIL_ERROR_MESSAGE);
                setEmailOk(false); 
            }
        }
    };

    return (
        <OutlinedInput
            id={id}
            value={email}
            onChange={handleInputtedEmail}
            sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
            label="Email"
        />
    );
};
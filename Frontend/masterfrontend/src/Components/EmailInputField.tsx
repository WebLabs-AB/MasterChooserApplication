import OutlinedInput from '@mui/material/OutlinedInput';
import { SetStateAction } from 'react';

// Own files.
import {Colors} from '../Assets/Colors';
import { EMAIL_ERROR_MESSAGE } from '../Assets/Constants';

interface Props {
    id: string;
    email: string;
    setEmailErrorField?: (value: SetStateAction<string>) => void;
    setEmail: (value: SetStateAction<string>) => void;
    setEmailOk?: (value: SetStateAction<boolean>) => void;
}

export const EmailInputField: React.FC<Props> = (props) => {

    const isEmailOk = (inputtedEmail: string): boolean  => {

        if (!props.setEmailErrorField) return true // We skip check to see if email meets requirements.

        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(regex.test(inputtedEmail)) { // Valid email
            if (props.setEmailErrorField) {
                props.setEmailErrorField("") ;
            }
            return true;
        }else {
            if (props.setEmailErrorField) {
                props.setEmailErrorField(EMAIL_ERROR_MESSAGE) ;
            }
            return false;
        }
    };

    const handleInputtedEmail = (event: { target: { value: string }; }) => {
        if (event.target.value.length === 0){
            props.setEmail(event.target.value);

            if (props.setEmailErrorField && props.setEmailOk) {
                props.setEmailErrorField(""); // Null value was inputted, field is empty.
                props.setEmailOk(false); 
            }
        }
        else{
            if(isEmailOk(event.target.value)) {
                props.setEmail(event.target.value);

                if (props.setEmailErrorField && props.setEmailOk) {
                    props.setEmailErrorField("");
                    props.setEmailOk(true); 
                }
            }
            else {
                props.setEmail(event.target.value);

                if (props.setEmailErrorField && props.setEmailOk) {
                    props.setEmailErrorField(EMAIL_ERROR_MESSAGE);
                    props.setEmailOk(false); 
                }
            }
        }
    };

    return (
        <OutlinedInput
            id={props.id}
            value={props.email}
            onChange={handleInputtedEmail}
            sx={{backgroundColor: Colors.transparentWhite, maxWidth: '400px'}}
            label="Email"
        />
    );
};
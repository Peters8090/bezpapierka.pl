import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import React, {useState} from 'react';


const MyTextField = props => (
    <>
        <TextField
            label={props.label}
            variant="outlined"
            color="secondary"
            value={props.valueState[0]}
            onChange={event => props.valueState[1](event.target.value)}
            required
            {...props}
            fullWidth
        />
        <Box m={2}/>
    </>
);

export const ContactForm = () => {
    const titleField = useState('');
    const emailField = useState('');
    const messageField = useState('');

    return (
        <form autoComplete="off" onSubmit={event => {
            event.preventDefault();
            alert('Przesłano');
            titleField[1]('');
            emailField[1]('');
            messageField[1]('');
        }}>
            <MyTextField label='Tytuł' valueState={titleField}/>
            <MyTextField label='Email' valueState={emailField} type='email'/>
            <MyTextField label='Email' valueState={messageField} multiline rows={8}/>

            <Box align='center'>
                <Button
                    variant="text"
                    color="secondary"
                    type='submit'
                    endIcon={<SendIcon/>}>
                    Wyślij
                </Button>
            </Box>
        </form>
    );
};
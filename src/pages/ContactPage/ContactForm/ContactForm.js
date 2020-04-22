import React, {useState} from 'react';

import {Box, Button, TextField} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";


const MyTextField = props => (
    <>
        <TextField
            variant="outlined"
            color='secondary'
            fullWidth
            required
            label={props.label}
            value={props.state[0]}
            onChange={event => props.state[1](event.target.value)}
            type={props.type}
            {...props}
        />
        <Box m={2}/>
    </>
);

export const ContactForm = () => {
    const fields = [
        {
            label: 'Tytuł',
            type: 'text',
            state: useState(''),
            extraProps: {}
        },
        {
            label: 'Email',
            type: 'email',
            state: useState(''),
            extraProps: {}
        },
        {
            label: 'Treść wiadomości',
            type: 'text',
            state: useState(''),
            extraProps: {
                multiline: true,
                rows: 8,
            }
        }
    ];

    return (
        <form autoComplete="off" onSubmit={event => {
            event.preventDefault();
            alert('Przesłano');
            fields.forEach(field => field.state[1](''))
        }}>
            {
                fields.map(field => (
                    <MyTextField key={field.label} label={field.label} type={field.type} state={field.state} {...field.extraProps}/>
                ))
            }

            <Box align='center'>
                <Button variant="text"
                        color="secondary"
                        type='submit'
                        endIcon={<SendIcon/>}>
                    Wyślij
                </Button>
            </Box>
        </form>
    );
};
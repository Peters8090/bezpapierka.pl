import {DjangoCSRFToken} from "django-react-csrftoken";
import React, {useState} from 'react';

import {Box, Button, TextField} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import {instance} from "../../../axios";


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
            backendName: 'title',
            label: 'Tytuł',
            type: 'text',
            state: useState(''),
            extraProps: {}
        },
        {
            backendName: 'email',
            label: 'Email',
            type: 'email',
            state: useState(''),
            extraProps: {}
        },
        {
            backendName: 'message',
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
        <form autoComplete="off" onSubmit={ async event => {
            event.preventDefault();
            try {
                await instance.post(
                    '/contact_form/',
                    Object.assign({}, ...fields.map(field => ({
                        [field.backendName]: field.state[0]
                    })))
                );
                alert('Przesłano.');

                fields.forEach(field => field.state[1](''))
            } catch (e) {
                alert('Wystąpił błąd.')
            }
        }}>
            {
                fields.map(field => (
                    <MyTextField key={field.label} label={field.label} type={field.type}
                                 state={field.state} {...field.extraProps}/>
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
import React, {useContext, useState} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Box, Button, CircularProgress, TextField, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import SendIcon from "@material-ui/icons/Send";
import {AuthContext} from '../../../App';
import {ContactPageContext} from "../ContactPage";


const MyTextField = props => (
    <React.Fragment>
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
    </React.Fragment>
);

export const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({
        type: '',
        message: '',
    });

    const contactPageContext = useContext(ContactPageContext);

    const myAxios = useContext(AuthContext).axios;

    const fields = [
        {
            apiName: 'title',
            label: 'Tytuł',
            type: 'text',
            state: useState(''),
            extraProps: {}
        },
        {
            apiName: 'email',
            label: 'Email',
            type: 'email',
            state: useState(''),
            extraProps: {}
        },
        {
            apiName: 'message',
            label: 'Treść wiadomości',
            type: 'text',
            state: useState(''),
            extraProps: {
                multiline: true,
                rows: 8,
            }
        }
    ];

    const submitForm = async event => {
        event.preventDefault();
        setLoading(true);
        try {
            await myAxios.post(
                '/contact_form/',
                Object.assign({}, ...fields.map(field => ({
                    [field.apiName]: field.state[0]
                })), {
                    contactPage: contactPageContext.id,
                })
            );
            setMessage({
                type: 'success',
                message: 'Przesłano.',
            });
        } catch (e) {
            setMessage({
                type: 'error',
                message: 'Wystąpił błąd.',
            });
        }
        setLoading(false);
    };

    const closeDialog = () => {
        if (message.type !== 'error' && message.message !== '')
            fields.forEach(field => field.state[1](''));
        setMessage({
            type: '',
            message: '',
        });
    };

    return (
        <form autoComplete="off" onSubmit={submitForm}>
            <Snackbar open={message.message !== ''} autoHideDuration={5000} onClose={closeDialog}>
                <Alert onClose={closeDialog} severity={message.type !== '' ? message.type : undefined}>
                    {message.message}
                </Alert>
            </Snackbar>
            {
                fields.map(field => (
                    <MyTextField key={field.label} label={field.label} type={field.type}
                                 state={field.state} {...field.extraProps}/>
                ))
            }

            <Box align='center' m={2}>
                {
                    loading ?
                        <CircularProgress color='secondary' size={20}/>
                        : <Button variant="text"
                                  color="secondary"
                                  type='submit'
                                  endIcon={<SendIcon/>}>
                            Wyślij
                        </Button>
                }
            </Box>
        </form>
    );
};
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import SendIcon from '@material-ui/icons/Send';
import TextField from "@material-ui/core/TextField";
import React, {useContext} from 'react';

import Typography from "@material-ui/core/Typography";
import {AppContext} from "../../contexts/AppContext";

import classes from './ContactPage.module.scss';

export const ContactPage = props => {
    const page = useContext(AppContext).find(page => props.pageId === page.id);

    return (
        <div className={classes.ContactPage}>
            <Typography variant='h1' className={classes.Title}>{page.name}</Typography>
            <div style={{
                display: "flex",
                justifyContent: 'space-evenly',
                flexWrap: 'wrap',
                padding: '1.5rem',
            }}>
                <form autoComplete="off" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    paddingTop: '2rem',
                }}>
                    <Typography variant='h3' align='center'>Formularz kontaktowy</Typography>
                    <Box p={2}/>
                    <TextField
                        id="outlined-secondary"
                        label="Tytuł"
                        variant="outlined"
                        color="secondary"
                        required
                        fullWidth
                    />
                    <Box p={1}/>
                    <TextField
                        id="outlined-secondary"
                        label="Adres email"
                        variant="outlined"
                        color="secondary"
                        type='email'
                        required
                        fullWidth
                    />
                    <Box p={1}/>
                    <TextField
                        id="outlined-secondary"
                        label="Treść wiadomości"
                        variant="outlined"
                        color="secondary"
                        required
                        fullWidth
                        multiline
                        rows={8}
                    />
                    <Box p={1}/>
                    <Button
                        variant="text"
                        color="secondary"
                        type='submit'
                        endIcon={<SendIcon/>}>
                        Wyślij
                    </Button>
                </form>
                <div style={{
                    paddingTop: '2rem',
                }}>
                    <Typography variant='h3'>Pozostałe informacje</Typography>
                    <Box p={1}/>
                    <Typography variant='h5'>Email: kontakt@bezpapierka.pl</Typography>
                    <Typography variant='h5'>Numer konta: PL 27 1140 2004 0000 3002 0135 5387</Typography>
                </div>
            </div>
        </div>
    );
};
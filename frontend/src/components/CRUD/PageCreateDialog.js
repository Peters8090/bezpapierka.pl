import {Box, FormControlLabel, useTheme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React, {useState} from 'react';

export const PageCreateDialog = props => {
    const [open, setOpen] = props.open;

    const fields = [
        {
            backendName: '',
            label: 'Typ strony',
            helpText: 'Ususs velum, tanquam gratis adgium.',
            type: 'select',
            state: useState(0),
            misc: {
                options: [
                    {id: 0, name: 'Home'},
                    {id: 1, name: 'Nieokreślony'},
                    {id: 2, name: 'Oferta'},
                    {id: 3, name: 'Kontakt'},
                ],
            },
        },
        {
            backendName: 'title',
            label: 'Tytuł',
            helpText: '',
            type: 'text',
            state: useState(''),
            misc: {maxLength: 50},
        },
        {
            backendName: 'link',
            label: 'Link',
            helpText: "Dla strony głównej zostaw '/', a pozostałe strony rozpoczynaj od '/', na przykład '/kontakt' ",
            type: 'text',
            state: useState(''),
            misc: {maxLength: 50},
        },
        {
            backendName: 'exact',
            label: 'Posiada podstrony',
            helpText: 'Odznacz, jeśli strona posiada inne podstrony (np. Oferta -> Detale Oferty)',
            type: 'checkbox',
            state: useState(true),
            misc: {},
        },
        {
            backendName: 'icon',
            label: 'Ikona',
            helpText: "Wpisz nazwę ikony z https://material.io/resources/icons. Na przykład 'accessibility'.",
            type: 'text',
            state: useState(''),
            misc: {maxLength: 50},
        },
    ];

    const theme = useTheme();


    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Dodaj stronę</DialogTitle>
            <DialogContent>
                {fields.map(field => {
                    const FieldWrapper = props => (
                        <Box>
                            {props.children}
                            <FormHelperText>{field.helpText}</FormHelperText>
                        </Box>
                    );
                    switch (field.type) {
                        default:
                            return <div/>;
                        case "text":
                            return (
                                <FieldWrapper>
                                    <TextField
                                        fullWidth
                                        color='secondary'
                                        margin='normal'
                                        label={field.label}
                                        inputProps={{'maxlength': field.misc.maxLength}}
                                        type={field.type}
                                        value={field.state[0]}
                                        onChange={event => field.state[1](event.target.value)}
                                    />
                                </FieldWrapper>
                            );
                        case "select":
                            return (
                                <FieldWrapper>
                                    <InputLabel shrink>{field.label}</InputLabel>
                                    <Select value={field.state[0]}
                                            style={{width: '100%'}}
                                            color='secondary'
                                            onChange={event => field.state[1](event.target.value)}>
                                        {
                                            field.misc.options.map(option => (
                                                <MenuItem value={option.id}>{option.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FieldWrapper>
                            );
                        case "checkbox":
                            return (
                                <FieldWrapper>
                                    <FormControlLabel
                                        style={{userSelect: 'none'}}
                                        control={
                                            <Checkbox
                                                checked={field.state[0]}
                                                onChange={event => field.state[1](event.target.checked)}
                                                color="secondary"
                                            />
                                        }
                                        label={field.label}
                                    />
                                </FieldWrapper>
                            );
                    }
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="secondary">
                    Anuluj
                </Button>
                <Button onClick={() => {
                }} color="secondary">
                    Zatwierdź
                </Button>
            </DialogActions>
        </Dialog>
    );
};
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
import {axiosInstance} from "../../axios";

export const PageCreateDialog = props => {
    const [open, setOpen] = props.open;

    const pageField = {
        backendName: 'type',
        label: 'Typ strony',
        required: true,
        validationErrors: useState([]),
        helpText: 'Ususs velum, tanquam gratis adgium.',
        type: 'select',
        state: useState(1),
        misc: {
            options: [
                {
                    id: 0,
                    name: 'Strona główna',
                    fields: [
                        {
                            backendName: 'heading',
                            label: 'Nagłówek',
                            required: true,
                            validationErrors: useState([]),
                            helpText: '',
                            type: 'text',
                            state: useState(''),
                            misc: {maxLength: 50},
                        },
                        {
                            backendName: 'subheading',
                            label: 'Podtytuł',
                            required: true,
                            validationErrors: useState([]),
                            helpText: '',
                            type: 'text',
                            state: useState(''),
                            misc: {maxLength: 100},
                        },
                    ],
                },
                {
                    id: 1,
                    name: 'Nieokreślony',
                    fields: [
                        {
                            backendName: 'title3',
                            label: 'Tytuł3',
                            required: true,
                            validationErrors: useState([]),
                            helpText: '',
                            type: 'text',
                            state: useState(''),
                            misc: {maxLength: 50},
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Oferta'
                },
                {
                    id: 3,
                    name: 'Kontakt'
                },
            ],
        },
    };


    const fields = [
        pageField,
        {
            backendName: 'title',
            label: 'Tytuł',
            required: true,
            validationErrors: useState([]),
            helpText: '',
            type: 'text',
            state: useState(''),
            misc: {maxLength: 50},
        },
        {
            backendName: 'description',
            label: 'Opis',
            required: false,
            validationErrors: useState([]),
            helpText: 'Ważny tylko i wyłącznie dla SEO',
            type: 'text',
            state: useState(''),
            misc: {maxLength: 1000},
        },
        {
            backendName: 'link',
            label: 'Link',
            required: true,
            validationErrors: useState([]),
            helpText: "Dla strony głównej zostaw '/', a pozostałe strony rozpoczynaj od '/', na przykład '/kontakt' ",
            type: 'text',
            state: useState(''),
            misc: {maxLength: 50},
        },
        {
            backendName: 'exact',
            label: 'Posiada podstrony',
            required: true,
            validationErrors: useState([]),
            helpText: 'Odznacz, jeśli strona posiada inne podstrony (np. Oferta -> Detale Oferty)',
            type: 'checkbox',
            state: useState(true),
            misc: {},
        },
        {
            backendName: 'icon',
            label: 'Ikona',
            required: true,
            validationErrors: useState([]),
            helpText: "Wpisz nazwę ikony z https://material.io/resources/icons. Na przykład 'accessibility'.",
            type: 'text',
            state: useState(''),
            misc: {maxLength: 50},
        },
        ...(pageField.state[0] !== undefined ?
            (pageField.misc.options.find(option => option.id === pageField.state[0])
                .fields)
            : [])
    ];


    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <form onSubmit={event => {
                event.preventDefault();
                // axiosInstance.post('home_page', fields.map(field => ({
                //     [field.backendName]: field.state[0],
                // }))).catch(reason => console.log(reason.body));
                const data = {};
                fields.forEach(field => data[field.backendName] = field.state[0]);
                axiosInstance.post('home_page', data).then(value => window.location.replace(`http://localhost:3000/builds/bezpapierka.pl/${fields[3].state[0]}`));
            }}>
                <DialogTitle>Dodaj stronę</DialogTitle>
                <DialogContent>
                    {fields.map(field => {
                        let children;
                        switch (field.type) {
                            default:
                                children = <div/>;
                                break;
                            case "text":
                                children = (
                                    <React.Fragment>
                                        <TextField
                                            fullWidth
                                            required={field.required}
                                            color='secondary'
                                            margin='normal'
                                            label={field.label}
                                            inputProps={{'maxlength': field.misc.maxLength}}
                                            type={field.type}
                                            value={field.state[0]}
                                            onChange={event => field.state[1](event.target.value)}
                                        />
                                    </React.Fragment>
                                );
                                break;
                            case "select":
                                children = (
                                    <React.Fragment>
                                        <InputLabel shrink id={field.backendName}>{field.label}{field.required && <span> *</span>}</InputLabel>
                                        <Select value={field.state[0]}
                                                labelId={field.backendName}
                                                style={{width: '100%'}}
                                                color='secondary'
                                                onChange={event => field.state[1](event.target.value)}>
                                            {
                                                field.misc.options.map(option => (
                                                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </React.Fragment>
                                );
                                break;
                            case "checkbox":
                                children = (
                                    <React.Fragment>
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
                                    </React.Fragment>
                                );
                                break;
                        }
                        return (
                            <React.Fragment key={field.backendName}>
                                {children}
                                <FormHelperText>{field.helpText}</FormHelperText>
                            </React.Fragment>
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Anuluj
                    </Button>
                    <Button type='submit' color="secondary">
                        Zatwierdź
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
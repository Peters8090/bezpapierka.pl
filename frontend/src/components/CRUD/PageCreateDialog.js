import {Box, CircularProgress, FormControlLabel, Input, useTheme} from "@material-ui/core";
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
    const [loading, setLoading] = useState(false);

    const pageField = {
        apiName: 'type',
        label: 'Typ strony',
        required: true,
        validationErrors: useState([]),
        helpText: '',
        type: 'select',
        state: useState(''),
        misc: {
            options: [
                {
                    id: 0,
                    name: 'Strona główna',
                    exact: true,
                    apiEndpoint: '/home_page',
                    fields: [
                        {
                            apiName: 'heading',
                            label: 'Nagłówek',
                            required: true,
                            validationErrors: useState([]),
                            helpText: '',
                            type: 'text',
                            state: useState(''),
                            misc: {maxLength: 50},
                        },
                        {
                            apiName: 'subheading',
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
                    exact: true,
                    apiEndpoint: '/content_page',
                    fields: [
                        {
                            apiName: 'title3',
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
                    name: 'Oferta',
                    exact: false,
                },
                {
                    id: 3,
                    name: 'Kontakt',
                    exact: true,
                },
            ],
        },
    };


    const fields = [
        pageField,
        {
            apiName: 'title',
            label: 'Tytuł',
            required: true,
            validationErrors: useState([]),
            helpText: '',
            type: 'text',
            state: useState(''),
            misc: {maxLength: 50},
        },
        {
            apiName: 'description',
            label: 'Opis',
            required: false,
            validationErrors: useState([]),
            helpText: 'Ważny tylko i wyłącznie dla SEO',
            type: 'text',
            state: useState(''),
            misc: {maxLength: 1000},
        },
        {
            apiName: 'link',
            label: 'Link',
            required: true,
            validationErrors: useState([]),
            helpText: "Dla strony głównej zostaw '/', a pozostałe strony rozpoczynaj od '/', na przykład '/kontakt' ",
            type: 'text',
            state: useState(''),
            misc: {maxLength: 50},
        },
        {
            apiName: 'icon',
            label: 'Ikona',
            required: true,
            validationErrors: useState([]),
            helpText: "Wpisz nazwę ikony z https://material.io/resources/icons. Na przykład 'accessibility'.",
            type: 'text',
            state: useState(''),
            misc: {maxLength: 50},
        },
        ...(pageField.state[0] in [undefined, ''] ?
            (pageField.misc.options.find(option => option.id === pageField.state[0])
                .fields)
            : [])
    ];


    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <form autoComplete="false"
                  autoSave="true"
                  onSubmit={event => {
                      event.preventDefault();

                      if (pageField.state[0] in [undefined, '']) {
                          const data = {};
                          fields.forEach(field => data[field.apiName] = field.state[0]);
                          data["exact"] = pageField.misc.options[pageField.state[0]].exact;

                          setLoading(true);
                          axiosInstance
                              .post(pageField.misc.options[pageField.state[0]].apiEndpoint, data)
                              .then(response => window.location.replace(response.data.link))
                              .catch(error => {
                                  const allFieldValidationErrors = {...error.response.data};
                                  Object.entries(allFieldValidationErrors)
                                      .forEach(
                                          ([fieldName, validationErrors]) =>
                                              fields.find(field => field.apiName === fieldName)
                                                  .validationErrors[1]([...validationErrors]));
                              }).finally(() => setLoading(false))
                      } else {
                          pageField.validationErrors[1](['To pole jest wymagane']);
                      }
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
                                    <Input
                                        label={field.label}
                                        inputProps={{'maxLength': field.misc.maxLength}}
                                        type={field.type}
                                        value={field.state[0]}
                                        onChange={event => field.state[1](event.target.value)}
                                    />
                                );
                                break;
                            case "select":
                                children = (
                                    <Select value={field.state[0]}
                                            labelId={field.label}
                                            id={field.apiName}
                                            style={{width: '100%'}}
                                            onChange={event => field.state[1](event.target.value)}>
                                        {
                                            field.misc.options.map(option => (
                                                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                );
                                break;
                        }
                        return (
                            <FormControl key={field.apiName}
                                         margin='dense'
                                         onFocus={_ => field.validationErrors[1]([])}
                                         error={field.validationErrors[0].length > 0}
                                         fullWidth
                                         color='secondary'
                                         required={field.required}>
                                <InputLabel id={field.label}>{field.label}</InputLabel>
                                {children}
                                {field.validationErrors[0].map(validationError =>
                                    <FormHelperText error>{validationError}</FormHelperText>)}
                                <FormHelperText error={false}>{field.helpText}</FormHelperText>
                            </FormControl>
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">
                        Anuluj
                    </Button>
                    <Button type='submit'
                            color="secondary"
                            disableRipple={loading}
                            style={{cursor: loading && 'default'}}>
                        {
                            loading ?
                                <CircularProgress color='secondary' style={{width: '1rem', height: '1rem'}}/> :
                                <span>Zatwierdź</span>
                        }
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
import {Box, CircularProgress, FormControlLabel, Input, useTheme} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import {PhotoCamera} from "@material-ui/icons";
import React, {useContext, useEffect, useState} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {withRouter} from "react-router-dom";
import {PagesContext} from "../../App";
import {axiosInstance} from "../../axios";
import {ContactPage} from "../../pages/ContactPage/ContactPage";
import {ContentPage} from "../../pages/ContentPage/ContentPage";
import {HomePage} from "../../pages/HomePage/HomePage";
import {OfferPage} from "../../pages/OfferPage/OfferPage";

const getPageField = (usesState, currentPage) => {
    return ({
        apiName: 'type',
        label: 'Typ strony',
        required: true,
        validationErrors: usesState([]),
        helpText: '',
        disabled: Object.keys(currentPage).length > 0,
        type: 'select',
        state: usesState(currentPage.component ? currentPage.component.name : ''),
        misc: {
            options: [
                {
                    component: HomePage,
                    name: 'Strona główna',
                    exact: true,
                    apiEndpoint: '/home_page' + (currentPage.id ? `/${currentPage.id}` : ''),
                    fields: [
                        {
                            apiName: 'heading',
                            label: 'Nagłówek',
                            required: true,
                            validationErrors: usesState([]),
                            helpText: '',
                            disabled: false,
                            type: 'text',
                            state: usesState(currentPage.heading ?? ''),
                            misc: {maxLength: 50},
                        },
                        {
                            apiName: 'subheading',
                            label: 'Podtytuł',
                            required: true,
                            validationErrors: usesState([]),
                            helpText: '',
                            disabled: false, type: 'text',
                            state: usesState(currentPage.subheading ?? ''),
                            misc: {maxLength: 100},
                        },
                        {
                            apiName: 'background_image',
                            label: 'Tło',
                            required: false,
                            validationErrors: usesState([]),
                            helpText: '',
                            disabled: false, type: 'image',
                            state: usesState(currentPage.background_image ?? undefined),
                            misc: {},
                        },
                    ],
                },
                {
                    component: ContentPage,
                    name: 'Z zawartością',
                    exact: true,
                    apiEndpoint: '/content_page' + (currentPage.id ? `/${currentPage.id}` : ''),
                    fields: [
                        {
                            apiName: 'contents',
                            label: 'Zawartość',
                            required: true,
                            validationErrors: usesState([]),
                            helpText: '',
                            disabled: false, type: 'text',
                            state: usesState(currentPage.contents ?? ''),
                            misc: {maxLength: 2000},
                        },
                        {
                            apiName: 'image',
                            label: 'Obraz',
                            required: false,
                            validationErrors: usesState([]),
                            helpText: '',
                            disabled: false, type: 'image',
                            state: usesState(currentPage.image ?? undefined),
                            misc: {},
                        },
                    ],
                },
                {
                    component: OfferPage,
                    name: 'Oferta',
                    exact: false,
                    apiEndpoint: '/offer_page' + (currentPage.id ? `/${currentPage.id}` : ''),
                    fields: [],
                },
                {
                    component: ContactPage,
                    name: 'Kontakt',
                    exact: true,
                    apiEndpoint: '/contact_page' + (currentPage.id ? `/${currentPage.id}` : ''),
                    fields: [
                        {
                            apiName: 'contact_form_email',
                            label: 'Email',
                            required: false,
                            validationErrors: usesState([]),
                            helpText: 'Zostanie użyty do formularza kontaktowego. Pozostaw puste, jeśli nie chcesz formularza kontaktowego.',
                            disabled: false, type: 'email',
                            state: usesState(currentPage.contact_form_email ?? ''),
                            misc: {},
                        }
                    ],
                },
            ],
        },
    });
};

export const PageCreateEditDialog = props => (
    <Dialog open={props.open[0]} onClose={() => props.open[1](false)} keepMounted={false}>
        <DialogForm {...props}/>
    </Dialog>
);

const DialogForm = withRouter(props => {
    const emptyValues = [undefined, null, ''];

    const setOpen = props.open[1];
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const pagesContext = useContext(PagesContext);

    let currentPage = {};
    if (props.editDialog)
        currentPage = pagesContext.find(page => page.link === props.location.pathname);

    const pageField = getPageField(useState, currentPage);


    useEffect(() => {

    }, []);

    const fields = [
        pageField,
        {
            apiName: 'title',
            label: 'Tytuł',
            required: true,
            validationErrors: useState([]),
            helpText: '',
            disabled: false, type: 'text',
            state: useState(currentPage.title ?? ''),
            misc: {maxLength: 50},
        },
        {
            apiName: 'description',
            label: 'Opis',
            required: false,
            validationErrors: useState([]),
            helpText: 'Ważny tylko i wyłącznie dla SEO.',
            disabled: false, type: 'text',
            state: useState(currentPage.description ?? ''),
            misc: {maxLength: 1000},
        },
        {
            apiName: 'link',
            label: 'Link',
            required: true,
            validationErrors: useState([]),
            helpText: "Dla strony głównej zostaw '/', a pozostałe strony rozpoczynaj od '/', na przykład '/kontakt'.",
            disabled: false, type: 'text',
            state: useState(currentPage.link ?? ''),
            misc: {maxLength: 50},
        },
        {
            apiName: 'icon',
            label: 'Ikona',
            required: true,
            validationErrors: useState([]),
            helpText: "Wpisz nazwę ikony z https://material.io/resources/icons. Na przykład 'accessibility'.",
            disabled: false, type: 'text',
            state: useState(currentPage.icon ?? ''),
            misc: {maxLength: 50},
        },
        ...(emptyValues.includes(pageField.state[0]) ? [] :
            (pageField.misc.options.find(option => option.component.name === pageField.state[0])
                .fields))
    ];


    return (
        <form autoComplete="false"
              noValidate
              autoSave="true"
              onSubmit={async event => {
                  event.preventDefault();

                  if (emptyValues.includes(pageField.state[0])) {
                      pageField.validationErrors[1](['To pole jest wymagane']);
                  } else {
                      const chosenPage = pageField.misc.options.find(page => page.component.name === pageField.state[0]);

                      const formData = new FormData();

                      fields.forEach(field => {
                          if (!(emptyValues.includes(field.state[0])))
                              formData.append(field.apiName, field.state[0])
                      });
                      formData.append('exact', chosenPage.exact);

                      setLoading(true);

                      try {
                          const sendRequest = props.editDialog ? axiosInstance.patch : axiosInstance.post;
                          const response = await sendRequest(chosenPage.apiEndpoint, formData);
                          window.location.replace(response.data.link)
                      } catch (error) {
                          if (!emptyValues.includes(error) && typeof error.response.data === "object") {
                              const fieldErrors = error.response.data;

                              for (const fieldName in fieldErrors) {
                                  const field = fields.find(field => field.apiName === fieldName);
                                  field.validationErrors[1](fieldErrors[fieldName]);
                              }
                          }
                      }

                      setLoading(false)

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
                        case "email":
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
                                            <MenuItem key={option.component.name}
                                                      value={option.component.name}>{option.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            );
                            break;
                        case "image":
                            children = (
                                <React.Fragment>
                                    <input
                                        accept="image/*"
                                        style={{width: 0, height: 0}}
                                        id={field.apiName}
                                        onChange={event => {
                                            const image = event.target.files[0];
                                            if (image !== undefined) {
                                                if (image.size > 3145728) {
                                                    event.target.value = '';
                                                    alert("Przesłany plik jest za duży. Maksymalna wielkość to 3MB.");
                                                } else
                                                    field.state[1](event.target.files[0]);
                                            }
                                        }}
                                        type="file"
                                    />
                                    <Box mt={3}
                                         style={{border: '#ccc 1px dashed'}}
                                         p={1.5}
                                         display='flex'
                                         flexDirection='column'
                                         alignItems='center'>
                                        {field.state[0] && (
                                            <Box mb={2}
                                                 p={1}
                                                 style={{border: '#ccc 1px dashed'}}
                                                 display='flex'
                                                 alignItems='center'>

                                                <Avatar alt='Wybrany plik'
                                                        src={typeof field.state[0] === 'string' ? field.state[0] : URL.createObjectURL(field.state[0])}/>

                                                <Typography style={{marginLeft: theme.spacing(1)}}
                                                            variant='subtitle1'>
                                                    {typeof field.state[0] === 'string' ?
                                                        field.state[0].substring(field.state[0].lastIndexOf('/') + 1)
                                                        : field.state[0].name}
                                                </Typography>
                                            </Box>
                                        )}
                                        <Button variant="contained"
                                                color="primary"
                                                size='small'
                                                component='label'
                                                htmlFor={field.apiName}>
                                            Wybierz plik
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            );
                            break;
                    }

                    return (
                        <FormControl key={field.apiName}
                                     margin='dense'
                                     onFocus={_ => field.validationErrors[1]([])}
                                     error={field.validationErrors[0].length > 0}
                                     fullWidth={true}
                                     disabled={field.disabled}
                                     color='secondary'
                                     required={field.required}>
                            <InputLabel shrink={['image'].includes(field.type) ? true : undefined}
                                        id={field.label}>{field.label}</InputLabel>
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
    );
});
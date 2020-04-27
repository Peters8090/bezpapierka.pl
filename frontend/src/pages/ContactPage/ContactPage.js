import React, {useContext} from 'react';

import {Box, Typography} from "@material-ui/core";
import {PageTitle} from "../../components/Miscellaneous/PageTitle";

import {PagesContext} from "../../contexts/PagesContext";
import {ContactForm} from "./ContactForm/ContactForm";
import {BasicInfo} from "./BasicInfo/BasicInfo";


const Section = props => {
    return (
        <Box m={2} mt={0}>
            <Typography variant='h3' align='center'>{props.text}</Typography>
            <Box p={2}/>
            {props.component}
        </Box>
    );
};

export const ContactPage = props => {
    const page = useContext(PagesContext).find(page => props.pageId === page.id);

    return (
        <div>
            <PageTitle title={page.title}/>
            <ContactPageContext.Provider value={page}>
                <Box mt={5}
                     display='flex'
                     justifyContent='space-evenly'
                     flexWrap='wrap'>
                    <Section text='Podstawowe informacje' component={<BasicInfo/>}/>
                    <Section text='Formularz kontaktowy' component={<ContactForm/>}/>
                </Box>
            </ContactPageContext.Provider>
        </div>
    );
};

export const ContactPageContext = React.createContext({});
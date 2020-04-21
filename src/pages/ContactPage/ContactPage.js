import React, {useContext} from 'react';

import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import {AppContext} from "../../contexts/AppContext";
import {ContactForm} from "./ContactForm/ContactForm";
import {OtherInfo} from "./OtherInfo/OtherInfo";

import classes from './ContactPage.module.scss';

const Section = (props) => {
    return (
        <div>
            <Typography variant='h3' align='center'>{props.text}</Typography>
            <Box p={2}/>
            {props.component}
        </div>
    );
};

export const ContactPage = props => {
    const page = useContext(AppContext).find(page => props.pageId === page.id);

    return (
        <div className={classes.ContactPage}>
            <Typography variant='h1' className={classes.Title}>{page.name}</Typography>
            <ContactPageContext.Provider value={page}>
                <Box className={classes.Content} mt={5}>
                    <Section text={page.misc.contactFormText} component={<ContactForm/>}/>
                    <Section text={page.misc.otherInfoText} component={<OtherInfo/>}/>
                </Box>
            </ContactPageContext.Provider>
        </div>
    );
};

export const ContactPageContext = React.createContext({});
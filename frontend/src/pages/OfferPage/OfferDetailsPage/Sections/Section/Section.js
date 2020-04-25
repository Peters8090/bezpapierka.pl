import React from 'react';

import PropTypes from 'prop-types';
import {Box, Typography, Divider} from "@material-ui/core";

import {Paragraph} from "./Paragraph/Paragraph";
import {MyStepper} from "./Stepper/MyStepper";

import classes from './Section.module.scss';


export const Section = props => {
    console.log(props);

    return (
        <section className={classes.Section}>
            <Typography variant='h3' align='center' gutterBottom>
                {props.title}
            </Typography>
            {
                props.type === 'Stepper' ?
                    <MyStepper /> :
                    <Paragraph body={props.contents}/>
            }
            <Box p={3}/>
            <Divider/>
        </section>
    );
};

Section.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,

    body: PropTypes.string,
};
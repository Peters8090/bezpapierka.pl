import React from 'react';

import {WaveBorder} from '../../components/UI/WaveBorder/WaveBorder';

import classes from './HomePage.module.scss';
import globalClasses from '../../index.module.scss';

export const HomePage = props => {
    return (
        <div className={classes.HomePage}>
            <div className={classes.Text}>
                <h1 className={[classes.Title, globalClasses.Responsive].join(' ')}>
                    Demissios ortum </h1>
                <h4 className={globalClasses.Responsive}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet molestie velit, et
                    commodo tortor. </h4>
            </div>
            <WaveBorder/>
        </div>
    );
};
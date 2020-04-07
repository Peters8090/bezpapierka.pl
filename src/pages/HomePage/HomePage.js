import React from 'react';
import classes from './HomePage.module.scss';
import {WaveBorder} from '../../components/UI/WaveBorder';

export const HomePage = props => {
    return (
        <div className={classes.HomePage}>
            <div className={classes.Content}>
                <div className={classes.Text}>
                    <h1 className={[classes.Title, 'responsive'].join(' ')}>
                        Demissios ortum </h1>
                    <h4 className={'responsive'}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet molestie velit, et
                        commodo tortor. </h4>
                </div>
                <WaveBorder/>
            </div>
        </div>
    );
};
import React, {Fragment, useState} from 'react';
import {WaveBorder} from "../UI/WaveBorder/WaveBorder";

import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';

import classes from './Layout.module.scss';

export const Layout = props => {
    const [isHomePage, setIsHomePage] = useState(false);

    return (
        <Fragment>
            <Header/>
            <main className={[classes.Main, isHomePage && classes.MainOnHomePage].join(' ')}>
                <LayoutContext.Provider value={{setIsHomePage: setIsHomePage}}>
                    {props.children}
                </LayoutContext.Provider>
                <WaveBorder/>
            </main>
            <Footer/>
        </Fragment>
    );
};

export const LayoutContext = React.createContext({
    setIsHomePage: isHomePage => {
    }
});
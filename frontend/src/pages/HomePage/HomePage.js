import React, {useContext} from 'react';

import {Typography, Box} from "@material-ui/core";

import {PagesContext} from "../../contexts/PagesContext";

export const HomePage = props => {
    const page = useContext(PagesContext).find(page => props.pageId === page.id);

    return (
        <Box display='flex'
             alignItems='center'
             justifyContent='center'>
            <div style={{width: '75vw', paddingBottom: '9vw'}}>
                <Typography variant='h1' gutterBottom style={{fontWeight: 'normal'}}>
                    {page.heading}
                </Typography>
                <Typography variant='h4' style={{fontWeight: 'lighter'}}>
                    {page.subheading}
                </Typography>
            </div>
        </Box>
    );
};
import React, {useContext} from 'react';

import {Avatar, Box, CardHeader, Icon, Typography} from "@material-ui/core";

import {ContactPageContext} from "../ContactPage";

export const BasicInfo = () => {
    const offerInfoContent = useContext(ContactPageContext).misc.otherInfoContent;

    return (
        <div>
            {
                offerInfoContent.map(info => (
                    <Box key={info.text}
                         border={1}
                         borderColor='grey.600'
                         borderRadius='50px'
                         mt={1} mb={3}>
                        <CardHeader avatar={<Avatar> <Icon>{info.icon}</Icon> </Avatar>}
                                    title={<Typography variant='h5'>{info.text}</Typography>}
                        />
                    </Box>
                ))
            }
        </div>
    );
};
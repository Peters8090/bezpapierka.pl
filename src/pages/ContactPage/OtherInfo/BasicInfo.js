import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";

import React, {useContext} from 'react';
import {ContactPageContext} from "../ContactPage";

export const BasicInfo = () => {
    const offerInfoContent = useContext(ContactPageContext).misc.otherInfoContent;

    return (
        <div>
            {
                offerInfoContent.map(info => (
                    <>
                        <Box border={1}
                             borderColor='grey.600'
                             borderRadius='50px'
                             mt={1} mb={3}>
                            <CardHeader avatar={<Avatar> <Icon>{info.icon}</Icon> </Avatar>}
                                        title={<Typography variant='h5'>{info.text}</Typography>}
                            />
                        </Box>
                    </>
                ))
            }
        </div>
    );
};
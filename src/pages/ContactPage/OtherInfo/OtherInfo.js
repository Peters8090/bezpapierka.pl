import Typography from "@material-ui/core/Typography";

import React, {useContext} from 'react';
import {ContactPageContext} from "../ContactPage";

export const OtherInfo = () => {
    const offerInfoContent = useContext(ContactPageContext).misc.otherInfoContent;

    return (
        <div>
            {
                offerInfoContent.map(text => <Typography variant='h5'>{text}</Typography>)
            }
        </div>
    );
};
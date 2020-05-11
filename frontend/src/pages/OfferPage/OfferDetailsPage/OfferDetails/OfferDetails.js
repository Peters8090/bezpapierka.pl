import EditIcon from '@material-ui/icons/Edit';
import React, {useContext, useState} from 'react';

import {
  Box,
  Container,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core';
import {BasicInfoAdmin} from '../../../../components/CRUD/BasicInfoAdmin';
import {DialogWithProps} from '../../../../components/CRUD/DialogForm/DialogForm';
import {SectionAdmin} from '../../../../components/CRUD/SectionAdmin';

import {OfferDetailsPageContext} from "../OfferDetailsPage";
import {MyStepper} from "./MyStepper/MyStepper";

export const OfferDetails = _ => {
    const offerDetailsPageContext = useContext(OfferDetailsPageContext);

    return (
        <Container maxWidth='md'>
            {offerDetailsPageContext.sections.map(section => {
                return (
                    <Section />
                );
            })}
            {offerDetailsPageContext.steps.length > 0 &&
            (
                <Detail title='Etapy'>
                    <MyStepper steps={offerDetailsPageContext.steps}/>
                </Detail>
            )}
        </Container>
    );
};

const Detail = props => (
    <section>
        <Box pt={4} pb={4}>
            <Typography variant='h3' align='center' gutterBottom>
                {props.title}
            </Typography>
            {props.children}
        </Box>
        <Divider/>
    </section>
);

const Section = ({section}) => {
  const offerDetailsPageContext = useContext(OfferDetailsPageContext);
  const [sectionEditDialogOpen, setSectionEditDialogOpen] = useState(false);


  return (
    <Detail title={section.title}>
      <Typography variant='h5' align='justify'>
        {section.contents}
        <IconButton
            onClick={() => setSectionEditDialogOpen(
                prevState => !prevState)}>
          <EditIcon/>
        </IconButton>
      </Typography>

      <DialogWithProps open={sectionEditDialogOpen}
                       setOpen={setSectionEditDialogOpen}>
        <SectionAdmin offer={offerDetailsPageContext.offer} section={section}/>
      </DialogWithProps>
    </Detail>
  );
};
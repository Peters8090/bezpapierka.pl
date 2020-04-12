import Divider from "@material-ui/core/Divider";
import React, {Fragment, useContext, useState} from 'react';

import {
    Stepper,
    Step,
    Typography,
    StepLabel,
    StepContent,
    Box,
    Avatar,
    AppBar,
    Toolbar,
    IconButton,
    Button
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import {AppContext} from "../../../contexts/AppContext";

import classes from './OfferDetailsPage.module.scss';

export const OfferDetailsPage = props => {
    const offer = useContext(AppContext).offers.find(offer => props.offerSlug === offer.slug);

    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className={classes.OfferDetailsPage}>
            <AppBar className={classes.Navigation} position='sticky' color='primary'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={props.dialogOnClose}>
                        <CloseIcon/>
                    </IconButton>

                    <Box className={classes.HeadingWrapper} ml={2}>
                        <Avatar
                            alt={`${offer.title}`}
                            src={offer.image}
                            className={classes.Avatar}/>
                        <Box ml={1.5}>
                            <Typography variant='h6'>{offer.title}</Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            <main className={classes.Content}>
                <Box p={5}>
                    <section className={classes.Section}>
                        <Typography variant='h3' align='center' gutterBottom>
                            Dlaczego warto?
                        </Typography>

                        <Typography variant='body2' align='justify'>
                            Lura de grandis ausus, pugna pes! Cum lura ire, omnes calceuses locus audax, festus
                            pulchritudinees.
                            Heu, consilium! Lactas observare, tanquam clemens advena. Superbus, regius exemplars diligenter
                            locus de fatalis, germanus advena.
                            Grandis, emeritis burguss superbe imperium de rusticus, primus nutrix. Regius medicina hic
                            examinares parma est.
                            Est flavum gemna, cesaris. Festus, alter speciess sapienter fallere de rusticus, fidelis abnoba.
                        </Typography>
                    </section>

                    <Divider/>

                    <section className={classes.Section}>
                        <Typography variant='h3' align='center' gutterBottom>
                            Kroki
                        </Typography>

                        <Stepper orientation='vertical' activeStep={activeStep} style={{
                            padding: 0,
                        }}>
                            {
                                offer.steps.map(step => (
                                    <Step key={step.name}>
                                        <StepLabel>
                                            <Typography variant='h5'>{step.name}</Typography>
                                        </StepLabel>
                                        <StepContent>
                                            <Typography variant='body2' align='justify' style={{
                                                color: '#888'
                                            }}>{step.description}
                                            </Typography>
                                            <Box pt={2}>
                                                {
                                                    activeStep < 2 ? <Button variant="contained" color="primary" onClick={() => setActiveStep(prevState => prevState + 1)}>
                                                        Dalej
                                                    </Button> : <Button variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                                                        Od nowa
                                                    </Button>
                                                }
                                            </Box>
                                        </StepContent>
                                    </Step>
                                ))
                            }
                        </Stepper>
                    </section>
                </Box>
            </main>
        </div>
    );
};
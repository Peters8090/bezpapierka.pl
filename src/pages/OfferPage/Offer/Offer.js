import React from 'react';

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import TextInfoContent from "@mui-treasury/components/content/textInfo";

import classes from "./Offer.module.scss";

export const Offer = props => (
    <div>
        <Grid item>
            <Card className={classes.Card}>
                <BrandCardHeader
                    image={
                        'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png'
                    }
                    extra={'SOME TEXT'}
                />
                <CardContent>
                    <TextInfoContent
                        overline={'Python Software Foundation'}
                        heading={'Python'}
                        body={
                            'Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991.'
                        }
                    />
                </CardContent>
            </Card>
        </Grid>
    </div>
);
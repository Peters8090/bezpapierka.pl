import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import classes from './OfferPage.module.scss';
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

export const OfferPage = props => {
    return (
        <div>
            <Card className={classes.Card}>
                <CardHeader
                    avatar={
                        <Avatar
                            src='https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/267_Python-512.png'>
                        </Avatar>
                    }
                    title="Ubi est fatalis tus?"
                    subheader="April 9, 2020"
                />
                <CardMedia
                    className={classes.Media}
                    image="https://i1.wp.com/geoawesomeness.com/wp-content/uploads/2017/09/Coding-Geospatial.jpg?resize=696%2C464&ssl=1"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        This impressive paella is a perfect party dish and a fun meal to cook together with your
                        guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button size="medium" color='primary'>
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};
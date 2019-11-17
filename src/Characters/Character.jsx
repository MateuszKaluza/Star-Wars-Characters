import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Films from "../Films/Films";

function Character(props) {
    const {model} = props;

    return (
        <Card>
            <CardContent>
                <Typography>
                    {model.name}
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemText >
                            Birth Year: {model.birth_year}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText >
                            Height: {model.height}cm
                        </ListItemText>
                    </ListItem>
                </List>
                <Films filmsUrls={model.films}/>
            </CardContent>
        </Card>
    );
}

Character.propTypes = {
    model: PropTypes.object.isRequired
};

export default Character;
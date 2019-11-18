import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from 'prop-types';

import './Character.css';

function Info(props) {
    const {name, birthYear, height} = props;

    return (
        <>
            <div className="character--name">
                {name}
            </div>
            <List dense>
                <ListItem>
                    <ListItemText>
                        Birth Year: {birthYear}
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText>
                        Height: {height}cm
                    </ListItemText>
                </ListItem>
            </List>
        </>
    );
}

Info.propTypes = {
    name: PropTypes.string.isRequired,
    birthYear: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
};

export default Info;
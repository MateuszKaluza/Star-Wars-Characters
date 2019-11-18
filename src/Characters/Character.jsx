import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";

import Films from "../Films/Films";
import Info from "./Info";

import './Character.css';

function Character(props) {
    const {name, height, birth_year: birthYear, films} = props.model;
    
    return (
        <Card className="character">
            <CardContent>
                <Info name={name} height={height} birthYear={birthYear}/>
                <Films filmsUrls={films}/>
            </CardContent>
        </Card>
    );
}

Character.propTypes = {
    model: PropTypes.object.isRequired
};

export default Character;
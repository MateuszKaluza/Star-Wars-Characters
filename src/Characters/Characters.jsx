import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Character from "./Character";
import {getCharacters} from "../utils";

function Characters(props) {
    const {queryString} = props;
    const [isLoading, toggleLoading] = useState(false);
    const [characters, setCharacters] = useState([]);

    const search = async () => {
        if (!queryString) return;

        setCharacters([]);
        toggleLoading(true);

        const url = `https://swapi.co/api/people/?search=${queryString}`;
        const characters = await getCharacters(url);

        setCharacters(characters);
        toggleLoading(false);
    };

    useEffect(() => {
        search();
    }, [props.queryString]);

    return (
        <div>
            {queryString && characters.map((character, index) => {
                return (
                    <Character model={character} key={index}/>
                );
            })}
            {isLoading && <LinearProgress/>}
        </div>
    );


}

Characters.propTypes = {
    queryString: PropTypes.string.isRequired
};

export default Characters;
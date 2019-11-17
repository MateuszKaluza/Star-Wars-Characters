import React, {useEffect, useState} from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

import Character from "./Character";
import {getCharacters} from "../utils";
import {PEOPLE_SEARCH} from "../urls";
import Error from "../common/Error";

function Characters(props) {
    const {queryString} = props;
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);
    const [characters, setCharacters] = useState([]);

    const search = () => {
        if (!queryString) return;

        setCharacters([]);
        setError(false);
        setLoading(true);

        const url = `${PEOPLE_SEARCH}${queryString}`;

        getCharacters(url)
            .then((characters) => {
                setCharacters(characters);
                setLoading(false);
            })
            .catch(error => {
                setError(true);
                setLoading(false);
                console.log(error);
            });
    };

    useEffect(() => {
        search();
    }, [props.queryString]);

    return (
        <div>
            {hasError && <Error/>}
            {isLoading && <LinearProgress/>}

            {queryString && characters.map((character, index) => {
                return (
                    <Character model={character} key={index}/>
                );
            })}
        </div>
    );


}

Characters.propTypes = {
    queryString: PropTypes.string.isRequired
};

export default Characters;
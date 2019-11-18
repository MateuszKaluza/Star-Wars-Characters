import React, {useEffect, useState} from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";
import axios from 'axios';

import Character from "./Character";
import {getCharacters} from "../utils";
import {PEOPLE_SEARCH} from "../urls";
import Error from "../common/Error";

function Characters(props) {
    const {queryString} = props;
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        let mounted = false;

        const fetchCharacters = async () => {
            if (!queryString) {
                setLoading(false);
                return;
            }

            setCharacters([]);
            setError(false);
            setLoading(true);

            const url = `${PEOPLE_SEARCH}${queryString}`;

            try {
                const characterData = await getCharacters(url);
                if(!mounted) {
                    setCharacters(characterData);
                    setError(false);
                    setLoading(false);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled');
                } else {
                    setError(true);
                    setLoading(false);
                }
            }
        };

        fetchCharacters();

        return () => {
            mounted = true;
        }
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
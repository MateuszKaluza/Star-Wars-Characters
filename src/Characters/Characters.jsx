import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as axios from "axios";
import Character from "./Character";

function Characters(props) {
    const {queryString} = props;
    const [isLoading, toggleLoading] = useState(false);
    const [characters, setCharacters] = useState([]);

    const search = async () => {
        toggleLoading(true);
        const response = await axios(`https://swapi.co/api/people/?search=${queryString}`);
        const characters = await response.data.results;
        setCharacters(characters);
        toggleLoading(false);
    };

    useEffect(() => {
        search();
    }, [queryString]);

    return (
        <div>
            {props.queryString && characters.map((character, index) => {
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
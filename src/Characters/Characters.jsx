import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";

import useFetchCharacters from "../hooks/useFetchCharacters";
import Character from "./Character";
import Error from "../common/Error";

function Characters(props) {
    const {queryString} = props;
    const {characters, hasError, isLoading} = useFetchCharacters(queryString);

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
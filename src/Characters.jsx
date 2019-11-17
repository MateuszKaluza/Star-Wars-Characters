import React from "react";
import PropTypes from "prop-types";

function Characters(props) {
    return (
        <div>
            {props.queryString}
        </div>
    );
}

Characters.propTypes  = {
    queryString: PropTypes.string.isRequired
};

export default Characters;
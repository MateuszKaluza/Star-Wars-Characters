import React from "react";
import PropTypes from "prop-types";

function Character(props) {
    const {model} = props;

    return (
        <div>{model.name}</div>
    );
}

Character.propTypes = {
    model: PropTypes.object.isRequired
};

export default Character;
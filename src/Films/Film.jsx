import React from "react";
import PropTypes from 'prop-types';

function Film(props) {
    const {title, release_date} = props.film;

    return (
        <div>{title} - {release_date}</div>
    );
}

Film.propTypes = {
  film: PropTypes.object.isRequired
};

export default Film;
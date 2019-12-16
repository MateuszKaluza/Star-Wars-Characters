import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';

function SearchInput(props) {

    const handleChange = event => {
        const value = event.target.value;
         props.handleChange(value);
    };

    return (
        <TextField
            label="Name"
            fullWidth
            onChange={handleChange}
            margin="normal"
            autoFocus
        />
    );
}

SearchInput.propTypes = {
    handleChange: PropTypes.func.isRequired
};

export default SearchInput;


import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

function SearchInput(props) {
    const [name, setName] = useState('');
    const debouncedHandler = debounce(props.handleChange, 300);

    const handleChange = event => {
        const value = event.target.value;
        setName(value);
        debouncedHandler(value);
    };

    return (
        <TextField
            label="Name"
            fullWidth
            value={name}
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


import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from 'prop-types';

function SearchInput(props) {
    const [name, setName] = useState('');

    const handleChange = event => {
        const value = event.target.value;
        setName(value);
        props.handleChange(value);
    };

    return (
        <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={handleChange}
            margin="normal"
        />
    );
}

SearchInput.propTypes  = {
    handleChange: PropTypes.func.isRequired
};

export default SearchInput;


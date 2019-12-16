import React, {useState} from 'react';
import SearchInput from "./common/SearchInput";
import Container from "@material-ui/core/Container";
import Characters from "./Characters/Characters";
import debounce from "lodash.debounce";

function App() {
    const [queryString, setQueryString] = useState('');
    const debouncedHandler = debounce(setQueryString, 300);

    return (
        <div>
            <Container maxWidth="sm">
                <SearchInput handleChange={debouncedHandler}/>
                <Characters queryString={queryString}/>
            </Container>
        </div>
    );
}

export default App;

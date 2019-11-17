import React, {useState} from 'react';
import SearchInput from "./common/SearchInput";
import Container from "@material-ui/core/Container";
import Characters from "./Characters/Characters";

function App() {
    const [queryString, setQueryString] = useState('');

    return (
        <div>
            <Container maxWidth="sm">
                <SearchInput handleChange={setQueryString}/>
                <Characters queryString={queryString}/>
            </Container>
        </div>
    );
}

export default App;

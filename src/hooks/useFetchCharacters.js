import {useEffect, useState} from 'react';
import {PEOPLE_SEARCH} from "../urls";
import {getCharacters} from "../utils";
import axios from "axios";

const useFetchCharacters = (queryString) => {
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(false);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        let mounted = false;

        const fetchCharacters = async () => {
            if (!queryString) {
                setLoading(false);
                return;
            }

            setCharacters([]);
            setError(false);
            setLoading(true);

            const url = `${PEOPLE_SEARCH}${queryString}`;

            try {
                const characterData = await getCharacters(url);
                if (!mounted) {
                    setCharacters(characterData);
                    setError(false);
                    setLoading(false);
                }
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled');
                } else {
                    setError(true);
                    setLoading(false);
                }
            }
        };

        fetchCharacters();

        return () => {
            mounted = true;
        }
    }, [queryString]);

    return {characters, hasError, isLoading};
};

export default useFetchCharacters;
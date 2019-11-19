import {useEffect, useState} from 'react';
import {getFilms} from "../utils";

const useFetchFilms = (filmsUrls) => {
    const [films, setFilms] = useState([]);
    const [hasError, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = false;

        const fetchFilms = async () => {
            try {
                const filmsData = await getFilms(filmsUrls);
                if (!mounted) {
                    setFilms(filmsData);
                    setError(false);
                    setLoading(false);
                }

            } catch (error) {
                if (!mounted) {
                    setError(true);
                    setLoading(false);
                }
            }
        };

        fetchFilms();

        return () => {
            mounted = true;
        };

    }, [filmsUrls]);

    return {films, hasError, isLoading};
};

export default useFetchFilms;
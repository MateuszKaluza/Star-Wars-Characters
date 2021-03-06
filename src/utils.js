import * as axios from "axios";
import partition from 'lodash.partition';

export const createCharactersRequest = () => {
    const cache = {};
    let token;

    return async (url) => {
        if(token) {
            token.cancel();
        }
        token = new axios.CancelToken.source();

        if (cache[url]) {
            return cache[url];
        }

        let characters = [];
        let response = await axios.get(url, {cancelToken: token.token});
        characters.push(...response.data.results);

        if (response.data.next) {
            const restCharacters = await handlePagination(response);
            characters.push(...restCharacters)
        }

        cache[url] = characters;

        return characters;
    }
};

const createFilmRequest = () => {
    const cache = {};

    return async (filmsUrls) => {
        const [filmsInCache, filmsNotInCache] = partition(filmsUrls, (url) => {
            return cache[url];
        });

        const filmPromises = filmsNotInCache.map(filmUrl => {
            return axios.get(filmUrl);
        });

        const cachedFilms = filmsInCache.map(film => cache[film]);

        const films = await axios.all(filmPromises);
        const newFilms = films
            .map(film => {
                const filmData = film.data;
                cache[filmData.url] = filmData;

                return filmData;
            });

        return (newFilms && cachedFilms.concat(newFilms)) || cachedFilms;
    }
};

export const getCharacters = createCharactersRequest();
export const getFilms = createFilmRequest();

async function handlePagination(response) {
    const characters = [];
    let nextUrl = response.data.next;

    do {
        response = await axios.get(nextUrl);
        characters.push(...response.data.results);
        nextUrl = response.data.next;
    }
    while (response.data.next);

    return characters;
}

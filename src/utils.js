import * as axios from "axios";

export const getCharacters = async (url) => {
    const characters = [];
    let response = await axios(url);
//todo try catch
    do {
        response = await axios(url);
        characters.push(...response.data.results);
        url = response.data.next;
    } while (response.data.next);

    return characters;
};

export const getFilms = async (filmsUrls) => {
    const filmPromises = filmsUrls.map(filmUrl => {
        return axios.get(filmUrl);
    });

    const films = await Promise.all(filmPromises);
    return films.map(film => film.data);
};

import {getFilms, makeCharactersRequest} from "./utils";
import axios from 'axios';

jest.mock('axios');

describe('getFilms', () => {
    it('should fetch every film if cache is empty', async () => {
        const fakeUrls = ['/first', '/second'];
        const first = {url: '/first', title: 'One'};
        const second = {url: '/second', title: 'Two'};

        const fakeFilmData = [
            {data: first},
            {data: second}
        ];

        axios.all.mockResolvedValue(fakeFilmData);

        const films = await getFilms(fakeUrls);

        expect(films).toStrictEqual([first, second]);

        expect(axios.all).toBeCalledTimes(1);
        expect(axios.get).toBeCalledTimes(2);

        expect(axios.get).toHaveBeenNthCalledWith(1, '/first');
        expect(axios.get).toHaveBeenNthCalledWith(2, '/second');
    });

    it('should fetch film if is not in cache', async () => {
        const filmInCacheUrl = '/filmInCache';
        const cachedFilm = {url: filmInCacheUrl, title: 'Chached'};

        axios.all.mockResolvedValue([{data: cachedFilm}]);
        await getFilms([filmInCacheUrl]);

        const filmNotInCacheUrl = '/filmInNotCache';
        const notCachedFilm = {url: filmNotInCacheUrl, title: 'Not chached'};

        axios.all.mockResolvedValue([{data: notCachedFilm}]);

        axios.all.mockClear();
        axios.get.mockClear();

        const films = await getFilms([filmInCacheUrl, filmNotInCacheUrl]);

        expect(films).toStrictEqual([cachedFilm, notCachedFilm]);

        expect(axios.all).toBeCalledTimes(1);
        expect(axios.get).toBeCalledTimes(1);

        expect(axios.get).toHaveBeenNthCalledWith(1, '/filmInNotCache');
    });
});


describe('getCharacters', () => {
    let getCharacters;

    beforeEach(() => {
        getCharacters = makeCharactersRequest();
    });

    afterEach(() => {
        getCharacters = null;
    });

    it('should fetch character if is not in cache', async () => {
        const fakeUrl = '/yoda';
        const fakeCharacterData = {name: 'Yoda'};
        const fakeCancelToken = undefined;

        axios.get.mockResolvedValue({data: {results: [fakeCharacterData]}});
        axios.get.mockClear();

        const characterData = await getCharacters(fakeUrl);

        expect(characterData).toStrictEqual([fakeCharacterData]);

        expect(axios.get).toBeCalledTimes(1);
        expect(axios.get).toHaveBeenNthCalledWith(1, '/yoda', {cancelToken: fakeCancelToken});
    });

    it('should not fetch character if is in cache', async () => {
        const fakeUrl = '/yoda';
        const fakeCharacterData = {name: 'Yoda'};

        axios.get.mockResolvedValue({data: {results: [fakeCharacterData]}});
        axios.CancelToken.source = jest.fn(() => {
            return {
                cancel() {
                }
            }
        });
        await getCharacters(fakeUrl);
        axios.get.mockClear();

        const characterData = await getCharacters(fakeUrl);
        expect(characterData).toStrictEqual([fakeCharacterData]);
        expect(axios.get).not.toBeCalled();
    });

    it('should fetch characters from all pages', async () => {
        const fakeUrl = '/yoda';
        const fakeCharacterData = {name: 'Yoda'};
        const fakeCharacterDataPage2 = {name: 'Yoda-2'};
        const fakeCancelToken = undefined;

        axios.get
            .mockReturnValueOnce({data: {next: '/yoda-2', results: [fakeCharacterData]}})
            .mockReturnValueOnce({data: {results: [fakeCharacterDataPage2]}});
        axios.get.mockClear();

        const characterData = await getCharacters(fakeUrl);

        expect(characterData).toStrictEqual([fakeCharacterData, fakeCharacterDataPage2]);

        expect(axios.get).toBeCalledTimes(2);
        expect(axios.get).toHaveBeenNthCalledWith(1, '/yoda', {cancelToken: fakeCancelToken});
        expect(axios.get).toHaveBeenNthCalledWith(2, '/yoda-2');
    });
});
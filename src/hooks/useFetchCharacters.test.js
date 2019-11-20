import useFetchCharacters from "./useFetchCharacters";
import * as utils from "../utils";
import {renderHook} from "@testing-library/react-hooks";
import {PEOPLE_SEARCH} from "../urls";

describe('useFetchCharacters', () => {
    beforeAll(() => {
        jest.spyOn(utils, 'getCharacters');
    });

    afterEach(() => {
        utils.getCharacters.mockClear();
    });

    afterAll(() => {
        utils.getCharacters.mockRestore();
    });

    it('should fetch characters from api', async () => {
        const fakeCharacters = [
            {name: 'Yoda'},
            {name: 'Vader'}
        ];
        const fakeQueryString = 'fakeQueryString';

        utils.getCharacters.mockImplementation(() => Promise.resolve(fakeCharacters));
        const {result, waitForNextUpdate} = renderHook(() => useFetchCharacters(fakeQueryString));

        await waitForNextUpdate();

        expect(utils.getCharacters).toHaveBeenNthCalledWith(1, `${PEOPLE_SEARCH}${fakeQueryString}`);

        expect(result.current.characters).toStrictEqual(fakeCharacters);
        expect(result.current.hasError).toBe(false);
        expect(result.current.isLoading).toBe(false);
    });

    it('should not fetch if empty queryString ', async () => {
        const fakeQueryString = '';

        const {result} = renderHook(() => useFetchCharacters(fakeQueryString));

        expect(utils.getCharacters).not.toHaveBeenCalled();

        expect(result.current.characters).toStrictEqual([]);
        expect(result.current.hasError).toBe(false);
        expect(result.current.isLoading).toBe(false);
    });

    it('should inform about error', async () => {
        const fakeQueryString = 'fakeQueryString';

        utils.getCharacters.mockImplementation(() => Promise.reject());
        const {result, waitForNextUpdate} = renderHook(() => useFetchCharacters(fakeQueryString));

        await waitForNextUpdate();

        expect(result.current.characters).toStrictEqual([]);
        expect(result.current.hasError).toBe(true);
        expect(result.current.isLoading).toBe(false);
    });
});
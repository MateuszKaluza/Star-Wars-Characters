import useFetchFilms from "./useFetchFilms";
import * as utils from "../utils";
import {renderHook} from "@testing-library/react-hooks";

describe('useFetchFilms', () => {
    beforeAll(() => {
        jest.spyOn(utils, 'getFilms');
    });

    afterEach(() => {
        utils.getFilms.mockClear();
    });

    afterAll(() => {
        utils.getFilms.mockRestore();
    });

    it('should fetch films from api', async () => {
        const fakeFilms = [
            {title: 'First'},
            {title: 'Second'}
        ];
        const fakeUrls = ['/first', '/second'];

        utils.getFilms.mockImplementation(() => Promise.resolve(fakeFilms));
        const {result, waitForNextUpdate} = renderHook(() => useFetchFilms(fakeUrls));

        await waitForNextUpdate();

        expect(utils.getFilms).toHaveBeenNthCalledWith(1, fakeUrls);

        expect(result.current.films).toStrictEqual(fakeFilms);
        expect(result.current.hasError).toBe(false);
        expect(result.current.isLoading).toBe(false);
    });

    it('should inform about error', async () => {
        utils.getFilms.mockImplementation(() => Promise.reject());
        const {result, waitForNextUpdate} = renderHook(() => useFetchFilms());

        await waitForNextUpdate();

        expect(result.current.films).toStrictEqual([]);
        expect(result.current.hasError).toBe(true);
        expect(result.current.isLoading).toBe(false);
    });
});
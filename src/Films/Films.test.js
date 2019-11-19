import React from "react";
import Films from "./Films";
import useFetchFilms from '../hooks/useFetchFilms';
import {shallow} from "enzyme";

jest.mock('../hooks/useFetchFilms');

describe('Films', () => {
    it('should display error component', () => {
        useFetchFilms.mockReturnValueOnce({hasError: true});

        const wrapper = shallow(<Films filmsUrls={[]}/>);

        expect(wrapper.exists('Error')).toBe(true);
    });

    it('should display loader', () => {
        useFetchFilms.mockReturnValueOnce({isLoading: true});

        const wrapper = shallow(<Films filmsUrls={[]}/>);

        expect(wrapper.childAt(0).childAt(1).name().includes('LinearProgress')).toBe(true);
    });

    it('should display films list', () => {
        useFetchFilms.mockReturnValueOnce({films: [{}]});

        const wrapper = shallow(<Films filmsUrls={['/yoda']}/>);

        expect(wrapper.find('Film')).toHaveLength(1);
    });

    it('should have header', () => {
        useFetchFilms.mockReturnValueOnce({films: []});

        const wrapper = shallow(<Films filmsUrls={[]}/>);

        expect(wrapper.text()).toStrictEqual('Films:');
    });
});
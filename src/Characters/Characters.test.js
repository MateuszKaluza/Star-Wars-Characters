import React from "react";
import Characters from "./Characters";
import useFetchCharacters from '../hooks/useFetchCharacters';
import {shallow} from "enzyme";

//todo clean up
jest.mock('../hooks/useFetchCharacters');

describe('Characters', () => {
    it('should display error component', () => {
        useFetchCharacters.mockReturnValueOnce({hasError: true});

        const wrapper = shallow(<Characters queryString=''/>);

        expect(wrapper.exists('Error')).toBe(true);
    });

    it('should display loader', () => {
        useFetchCharacters.mockReturnValueOnce({isLoading: true});

        const wrapper = shallow(<Characters queryString=''/>);

        expect(wrapper.childAt(0).name().includes('LinearProgress')).toBe(true);
    });

    it('should not display characters when queryString is empty', () => {
        useFetchCharacters.mockReturnValueOnce({});

        const wrapper = shallow(<Characters queryString=''/>);

        expect(wrapper.exists('Character')).toBe(false);
    });

    it('should display characters list', () => {
        useFetchCharacters.mockReturnValueOnce({characters: [{}]});

        const wrapper = shallow(<Characters queryString='yoda'/>);

        expect(wrapper.find('Character')).toHaveLength(1);
    });
});
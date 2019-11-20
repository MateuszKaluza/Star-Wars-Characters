import React from 'react';
import SearchInput from './SearchInput';
import {shallow} from 'enzyme';

jest.mock('lodash.debounce', () => jest.fn(fn => fn));

describe('SearchInput', () => {
    it('should called passed function on change', () => {
        const spy =  jest.fn();
        const characterName = 'Yoda';
        const fakeEvent = {target: {value: characterName}};
        const wrapper = shallow(<SearchInput handleChange={spy}/>);

        wrapper.simulate('change', fakeEvent);

        expect(spy).toHaveBeenNthCalledWith(1, characterName)
    });
});
import React from 'react';
import Error from './Error';
import {shallow} from 'enzyme';

describe('Error',  () => {
    it('should display warning text', () => {
        const wrapper = shallow(<Error/>);

        expect(wrapper.text()).toStrictEqual('Something went wrong :(');
        expect(wrapper.hasClass('error')).toBe(true);
    });
});
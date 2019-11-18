import React from 'react';
import Error from './Error';
import {shallow} from 'enzyme';
import {assert} from "chai";

describe('Error',  () => {
    it('should display warning text', () => {
        const wrapper = shallow(<Error/>);

        assert.strictEqual(wrapper.text(), 'Something went wrong :(');
        assert.isTrue(wrapper.hasClass('error'));
    });

});
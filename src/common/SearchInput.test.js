import React from 'react';
import SearchInput from './SearchInput';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {assert} from "chai";
import debounce from 'lodash.debounce';

jest.mock('lodash.debounce', () => jest.fn(fn => fn));

describe('SearchInput', () => {
    it('should called passed function on change', () => {
        const spy = sinon.spy();
        const characterName = 'Yoda';
        const fakeEvent = {target: {value: characterName}};
        const wrapper = shallow(<SearchInput handleChange={spy}/>);

        wrapper.simulate('change', fakeEvent);

        assert.isTrue(spy.calledOnceWithExactly(characterName));
    });
});
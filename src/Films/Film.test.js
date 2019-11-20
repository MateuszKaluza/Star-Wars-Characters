import React from 'react';
import Film from './Film';
import {shallow} from 'enzyme';

describe('Film', () => {
    it('should display passed props', () => {
        const title = 'abc';
        const release_date = '2005-05-19';
        const film = {title, release_date};

        const wrapper = shallow(<Film film={film}/>);

        expect(wrapper.text()).toStrictEqual(`${title} - ${release_date}`)
    });
});
import React from 'react';
import Info from './Info';
import {shallow} from 'enzyme';

describe('Info', () => {
    it('should display character name', () => {
        const name = 'Yoda';
        const wrapper = shallow(<Info name={name} birthYear='' height=''/>);

        expect(wrapper.find('div.character__name').text()).toStrictEqual(name);
    });

    it('should display character birth year', () => {
        const birthYear = '44BBY';
        const wrapper = shallow(<Info birthYear={birthYear} name='' height=''/>);

        expect(wrapper.text().includes(`Birth Year: ${birthYear}`));
    });

    it('should display character height', () => {
        const height = '175';
        const wrapper = shallow(<Info height={height} birthYear='' name=''/>);

        expect(wrapper.text().includes(`Height: ${height}cm`));
    });
});
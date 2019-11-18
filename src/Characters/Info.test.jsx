import React from 'react';
import Info from './Info';
import {shallow} from 'enzyme';
import {assert} from "chai";

describe('Info',  ()=> {
    it('should display character name', () => {
        const name = 'Yoda';
        const wrapper = shallow(<Info name={name} birthYear='' height=''/>);

        assert.strictEqual(wrapper.find('div.character--name').text(), name);
    });

    it('should display character birth year', () => {
        const birthYear = '44BBY';
        const wrapper = shallow(<Info birthYear={birthYear} name='' height=''/>);

        assert.isTrue(wrapper.text().includes(`Birth Year: ${birthYear}`));
    });

    it('should display character height', () => {
        const height = '175';
        const wrapper = shallow(<Info height={height} birthYear='' name=''/>);

        assert.isTrue(wrapper.text().includes(`Height: ${height}cm`));
    });
});
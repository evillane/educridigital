/*import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems/>', ()=>{
    
    let wrapper = null;
    beforeEach(() => {
         wrapper = shallow(<NavigationItems/>);
    });

    it('should render two <NavigationItems/> elements it not aunthenticated', ()=>{
       
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render tree <NavigationItems/> elements If aunthenticated', ()=>{
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', ()=>{
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    });
});

export default NavigationItems;*/
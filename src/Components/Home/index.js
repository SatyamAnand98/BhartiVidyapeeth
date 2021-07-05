import React, {Component} from 'react';
import Home from './Home';
import AboutUs from './AboutUs/AboutUs';

export default class HomeIndex extends Component {
    render(){
        return(
            <div>
                <Home />
                <AboutUs />
            </div>
        )
    }
}
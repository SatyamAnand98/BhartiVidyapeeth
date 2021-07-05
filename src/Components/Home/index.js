import React, {Component} from 'react';
import Home from './HomeDisplay/Home';
import AboutUs from './AboutUs/AboutUs';
import JoinUs from './JoinUs/JoinUs'

export default class HomeIndex extends Component {
    render(){
        return(
            <div>
                <Home />
                <AboutUs />
                <JoinUs />
            </div>
        )
    }
}
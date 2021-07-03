import React, { Component } from 'react';
import childImage from '../../images/childImage.jpeg';

export default class Home extends Component {
    render(){
        return(
            <div className="home">
                <h1><b>BHARTI VIDYAPEETH</b></h1>
                {/* <img src="childImage.jpeg" alt="child" className="home" style={{"width":"80%"}} /> */}
                <div className="leftCenter">JOIN A COMMUNITY OF LIFELONG LEARNERS!</div>
                <div className="leftCenter2">STAY CURIOUS</div>
                <a href="tel:+918271555938"type="button" className="contactNo ">Book Tour</a>
                {/* <button type="button" class="btn-lg contactNo" onClick={() => { "tel:+1-555-555-1212"}}>BOOK TOUR</button> */}
            </div>
        )
    }
}
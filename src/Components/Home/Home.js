import React, { Component } from 'react';
import AboutUs from '../AboutUs/AboutUs';

export default class Home extends Component {
    render(){
        return(
            <>
                <section>
                    <div className="home">
                        <h1>BHARTI VIDYAPEETH</h1>
                        <img src="school1.jpg" alt="child" style={{"width":"70%"}} />
                        <div className="leftCenter2" style={{
                            "background-color":"black", "color": "white", "font-family": ["Verdana", "Geneva", "Tahoma", "sans-serif"], "letter-spacing": "5px",  "padding": "7px",  "font-size":"20px"
                        }}>JOIN A COMMUNITY OF LIFELONG LEARNERS!</div>
                        <div className="leftCenter">STAY CURIOUS</div>
                        <a href="tel:+918271555938"type="button" className="contactNo">Book Tour</a>
                        {/* <button type="button" class="btn-lg contactNo" onClick={() => { "tel:+1-555-555-1212"}}>BOOK TOUR</button> */}
                    </div>
                    <br></br>
                    <AboutUs />
                </section>
            </>
        )
    }
}
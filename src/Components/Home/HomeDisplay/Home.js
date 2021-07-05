import React, { Component } from 'react';

export default class Home extends Component {
    render(){
        return(
            <section className="home">
                <h1>BHARTI VIDYAPEETH</h1>
                <img src="school1.jpg" alt="child" style={{"width":"70%"}} />
                <div className="leftCenter2" style={{
                    "background-color":"black", "color": "white", "font-family": ["Verdana", "Geneva", "Tahoma", "sans-serif"], "letter-spacing": "5px",  "padding": "7px",  "font-size":"20px"
                }}>JOIN A COMMUNITY OF LIFELONG LEARNERS!</div>
                <p className="leftCenter">STAY CURIOUS</p>
                <a href="/contact" type="button" className="contactNo">Contact Us</a>
                {/* <a href="tel:+918271555938" type="button" className="contactNo">Call Us</a> */}
                {/* <button type="button" class="btn-lg contactNo" onClick={() => { "tel:+1-555-555-1212"}}>BOOK TOUR</button> */}
                <br></br><br></br>
            </section>
        )
    }
}
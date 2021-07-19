import React, { Component } from 'react';

export default class Home extends Component {
    render(){
        return(
            <section className="home">
                <h1>BHARTI VIDYAPEETH</h1>
                <img src="school1.jpg" alt="child" style={{"width":"70%"}} />
                <br></br><br></br>
            </section>
        )
    }
}
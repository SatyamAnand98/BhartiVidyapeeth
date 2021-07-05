import React, { Component } from 'react';

export default class JoinUs extends Component {
    render() {
        return (
            <div className="aboutus">
                <section>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <img src="chalk.jpeg" alt="chalk image" style={{"width":"100%"}}/>
                            </div>
                            <div class="col">
                                <h2 style={{ "color": "grey", "textAlign": "left", "marginTop": "30px"}}>Feel like we are the right school for you?</h2>
                                <h2 style={{"textAlign": "left", "marginTop":"30px"}}>JOIN OUR ONLINE CLASSES NOW!</h2>
                                <p style={{ "color": "grey", "textAlign": "left", "marginTop": "30px", "fontSize":"20px" }}>Fill out an application to get the process started today!</p>
                                <div style={{"textAlign": "left", "marginTop": "30px"}}>
                                    <a href="https://forms.gle/E6uE5N85jYwFGt5EA" type="button" className="ApplyNow">Apply Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
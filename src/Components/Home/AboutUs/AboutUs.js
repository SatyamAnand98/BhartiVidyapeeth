import React, {Component} from 'react';

export default class AboutUs extends Component {
    render(){
        return(
            <div className="aboutus">
                <section>
                    <h5><span className="aboutHeading">ABOUT US</span></h5>
                    <br></br>
                    <p className="DescriptionHeading">Dedicated Educators</p>
                    <p class="description" style={{ "color": "grey" }}>We know that learning is easier when you have an excellent teacher. That's why most of our educators have achieved an advanced degree in their field. Our faculty are passionate about the subjects they teach and bring this enthusiasm into their lessons.</p>
                    <div class="container">
                        <div class="row">
                            <div class="col-sm">
                                <p className="DescriptionHeading">First-Rate Curriculum</p>
                                <p class="description" style={{ "color": "grey" }}>Are you a beginner, expert, or somewhere in between? Not to worry! We offer a variety of high-quality courses designed to prepare you for your next step. We offer placement tests to help match you to your skill level.</p>
                            </div>
                            <div class="col-sm">
                                <p className="DescriptionHeading">Exciting Extracurriculars</p>
                                <p class="description" style={{"color":"grey"}}>We offer a wide variety of extracurricular activities; ranging from music lessons, team sports, to art classes. We have options that cater to every student's interests. Keep an eye out for sign-ups!</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
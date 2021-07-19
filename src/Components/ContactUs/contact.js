import React, {Component} from 'react';
import personalInfo from '../../config';

export default class ContactUs extends Component {
    render(){
        const url = "https://api.whatsapp.com/send/?phone="+personalInfo.WhatsAppNumber+"&text=Admission%20Enquirey&app_absent=0";
        const urlLanguageSpecific = "https://api.whatsapp.com/send/?phone="+personalInfo.WhatsAppNumber+"&text=Admission%20Enquirey&app_absent=0&lang=en"
        const urlMail = "mailto:" + personalInfo.emailAddress +"?subject=Enquirey About the Admission in Bharti Vidyapeeth";

        return(
            <section>
                <div className="leftCenter2" style={{
                    "background-color":"black", "color": "white", "font-family": ["Verdana", "Geneva", "Tahoma", "sans-serif"], "letter-spacing": "5px",  "padding": "7px",  "font-size":"20px"
                }}>JOIN A COMMUNITY OF LIFELONG LEARNERS!</div>
                <p className="leftCenter">STAY CURIOUS</p>

                <h3>Contact Us</h3>

                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                            <a href={"tel:" + personalInfo.callingNumber} type="button" className="contactNo"><i className="fa fa-fw fa-phone"></i>Call Us</a>
                            <br></br>
                        </div>
                        <div class="col-sm">
                            <button type="button" class="contactNo" onClick={() => { window.open(urlLanguageSpecific, '_blank').focus() }}><i className="fa fa-fw fa-whatsapp"></i>WhatsApp us</button>
                            <br></br>
                        </div>
                        <div class="col-sm">
                            <button type="button" class="contactNo" onClick={() => { window.open(urlMail, '_blank').focus() }}><i className="fa fa-fw fa-envelope"></i>Email Us</button>
                            <br></br>
                        </div>
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-sm">
                            <h3>Follow us on Facebook</h3>
                            <div class="fb-page" data-href="https://www.facebook.com/BhartiVidyapeethBVP/" data-tabs="timeline" style={{"data-width":"70%", "data-height":"auto", "data-small-header":"false", "data-adapt-container-width":"true", "data-hide-cover":"false", "data-show-facepile":"true"}}>
                                <blockquote cite="https://www.facebook.com/BhartiVidyapeethBVP/" class="fb-xfbml-parse-ignore">
                                    <a href="https://www.facebook.com/BhartiVidyapeethBVP/">Bharti Vidyapeeth</a>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
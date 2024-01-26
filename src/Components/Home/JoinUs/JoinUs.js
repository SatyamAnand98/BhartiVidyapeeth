import React, { Component } from "react";
import personalInfo from "../../../config";

export default class JoinUs extends Component {
    render() {
        return (
            <div className="aboutus">
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img
                                    src="chalk.jpeg"
                                    alt="chalk"
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="text-left mt-3">
                                    <h2
                                        style={{
                                            color: "grey",
                                            textAlign: "left",
                                            marginTop: "50px",
                                            marginBottom: "50px",
                                        }}
                                    >
                                        Feel like we are the right school for
                                        you?
                                    </h2>
                                    <h2>JOIN OUR ONLINE CLASSES NOW!</h2>
                                    <p
                                        style={{
                                            color: "grey",
                                            fontSize: "20px",
                                        }}
                                    >
                                        Fill out an application to get the
                                        process started today!
                                    </p>
                                    <div className="mt-3">
                                        <button
                                            onClick={() => {
                                                window
                                                    .open(
                                                        personalInfo.urlForm,
                                                        "_blank"
                                                    )
                                                    .focus();
                                            }}
                                            type="button"
                                            className="ApplyNow"
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

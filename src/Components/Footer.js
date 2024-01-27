import React from "react";
import "../App.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    {`Copyright © ${new Date().getFullYear()} Bharti Vidyapeeth - All Rights Reserved.`}
                </p>
                <p>
                    Powered by{" "}
                    <a
                        href="https://satyamanand.in"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            color: "black",
                            textDecoration: "underline",
                        }}
                    >
                        Satyam Anand
                    </a>
                </p>
            </div>
        </footer>
    );
}

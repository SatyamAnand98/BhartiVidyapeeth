import React from "react";
import "../App.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    {`Copyright © ${new Date().getFullYear()} Bharti Vidyapeeth - All Rights Reserved.`}
                </p>
                <p>Powered by Satyam Anand</p>
            </div>
        </footer>
    );
}

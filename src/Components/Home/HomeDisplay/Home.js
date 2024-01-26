import React, { Component } from "react";
import styled from "styled-components";

export default class Home extends Component {
    render() {
        return (
            <HomeStyled className="home">
                <h1>BHARTI VIDYAPEETH</h1>
                <img src="school1.jpg" alt="child" style={{ width: "70%" }} />
                <br></br>
                <br></br>
            </HomeStyled>
        );
    }
}

const HomeStyled = styled.section`
    font-family: "Times New Roman", Times, serif;
    text-align: center;
    h1 {
        font-size: 3rem;
        font-weight: 500;
        color: #000;
        margin-bottom: 1rem;
    }
`;

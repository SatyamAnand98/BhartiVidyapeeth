import React from "react";
import styled from "styled-components";

const PageNotFound = () => {
    return (
        <PageNotFoundStyled id="wrapper">
            <img src="https://i.imgur.com/qIufhof.png" alt="Page Not Found" />
            <div id="info">
                <h3>This page could not be found</h3>
            </div>
        </PageNotFoundStyled>
    );
};

const PageNotFoundStyled = styled.div`
    font-family: "Open Sans", sans-serif;
    background: #f2f2f2;
    border: 1px solid #ccc;
    border-radius: 32px;
    img {
        width: 50%;
        height: auto;
    }

    @media (max-width: 768px) {
        margin: 0 auto;
        width: 100%;
        height: 100%;
        font-family: "Open Sans", sans-serif;
        img {
            width: 100%;
            height: auto;
        }
    }
`;

export default PageNotFound;

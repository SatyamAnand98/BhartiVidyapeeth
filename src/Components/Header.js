import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import "../App.css";
import { icons } from "../store/icons.js";

export default class Header extends Component {
    render() {
        return (
            <>
                <HeaderStyled>
                    <Navbar bg="light" expand="lg" className="header">
                        <a className="navbar-brand mt-2 mt-lg-0" href="home">
                            <img
                                src="logo.jpg"
                                height="60"
                                alt=""
                                loading="lazy"
                            />
                        </a>
                        <Navbar.Brand className="brand" href="/home">
                            <b>Bharti Vidyapeeth</b>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="/home">
                                    {icons.home}Home
                                </Nav.Link>
                                <Nav.Link href="/contact">
                                    {icons.contact}
                                    Contact
                                </Nav.Link>
                                <Nav.Link href="/about">
                                    {icons.about}About
                                </Nav.Link>
                                <Nav.Link href="/join">
                                    {icons.join}Join
                                </Nav.Link>
                                <Nav.Link href="/gallery">
                                    {icons.gallery}Gallery
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </HeaderStyled>
            </>
        );
    }
}

const HeaderStyled = styled.div`
    .header {
        // display: flex;
        // align-items: center;

        .navbar-brand {
            img {
                margin-left: 30px;
            }
        }

        // .brand {
        //     position: absolute;
        //     left: 50%;
        //     transform: translateX(-50%);
        // }

        @media (min-width: 768px) {
            .navbar-collapse {
                justify-content: flex-end;
            }
        }
    }
`;

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
                                height="80"
                                alt=""
                                loading="lazy"
                            />
                        </a>
                        <Navbar.Brand className="brand" href="/home">
                            <b className="brand-name">Bharti Vidyapeeth</b>
                        </Navbar.Brand>
                        <Navbar.Toggle
                            className="nav-toggle"
                            aria-controls="basic-navbar-nav"
                        />
                        <Navbar.Collapse
                            id="basic-navbar-nav"
                            className="nav-collapse"
                        >
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
                                <Nav.Link href="/achievement">
                                    {icons.achievements}Achievements
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
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        display: flex;

        .navbar-brand {
            img {
                margin-left: 2rem;
                justify-content: flex-start;
            }
        }

        .brand {
            font-size: 3rem;
            font-family: "Times New Roman", Times, serif;
            .brand-name {
                @media (min-width: 992px) {
                    margin-left: 2rem;
                    display: flex;
                    justify-content: flex-center;
                }
            }
        }

        .nav-toggle {
            border: none;
            background: transparent;
            outline: none;
        }

        .nav-collapse {
            justify-content: flex-end;
            margin-right: 2rem;
        }
    }

    .nav-link {
        pointer: cursor;
        font-size: 1.3rem;
        font-family: "Times New Roman", Times, serif;
        color: #000;
        margin-left: 0.5rem;
        &:hover {
            color: #fff !important;
            background-color: #5a5b5c;
            border-radius: 5px;
        }
    }

    @media (max-width: 768px) {
        .header {
            .navbar-brand {
                img {
                    margin-left: 10px;
                }
            }

            .brand {
                font-size: 1.4rem;
                font-family: "Times New Roman", Times, serif;
            }
        }
    }
`;

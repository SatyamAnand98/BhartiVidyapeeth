
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap'
import React, { Component } from 'react'

export default class Header extends Component {
    render() {
        return (
            <>
                <div className="header">
                    <Navbar bg="light" expand="lg">
                        <a className="navbar-brand mt-2 mt-lg-0" href="home">
                            <img
                                src="logo.jpg"
                                height="60"
                                alt=""
                                loading="lazy"
                            />
                        </a>
                        <Navbar.Brand href="/home"><b>Bharti Vidyapeeth</b></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/home"><i className="fa fa-fw fa-home"></i>Home</Nav.Link>
                                <Nav.Link href="/contact"><i className="fa fa-fw fa-envelope"></i>Contact</Nav.Link>
                                <Nav.Link href="/about">About</Nav.Link>
                                <Nav.Link href="/join">Join</Nav.Link>
                                {/* <NavDropdown title="Dropdown" className="highlight" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown> */}
                            </Nav>
                        </Navbar.Collapse>

                        <Form className="d-flex">
                            {/* <NavDropdown style={{ color: "grey" }} title={
                                <i style={{ color: "grey" }} className="fa fa-bell"><span className="badge rounded-pill badge-notification bg-danger">1</span></i>
                            } id="basic-nav-dropdown" className="highlight">
                                <NavDropdown.Item href="#action/3.1">Notification 1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Notification 2</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Notification 3</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Notification 4</NavDropdown.Item>
                            </NavDropdown> */}


                            {/* <NavDropdown title={
                                <img
                                    src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                                    className="rounded-circle"
                                    height="25"
                                    alt=""
                                    loading="lazy"
                                />
                            } id="basic-nav-dropdown" class="dropdown-left-manual"> */}
                            <NavDropdown alignRight title={<span><i className="fa fa-bars"></i></span>}>
                                <NavDropdown.Item href="/myprofile"><i className="fa fa-fw fa-user"></i>Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/logout"><i className="fa fa-fw fa-power-off"></i>Log out</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success"><i className="fa fa-fw fa-search"></i> </Button> */}
                        </Form>
                    </Navbar>
                </div>
            </>
        )
    }
}
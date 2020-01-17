import React, { Component } from "react";
import Logo from "./jku.png";

import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  Nav,
  NavLink,
  Collapse,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  NavbarText
} from "reactstrap";

class Navigation extends Component {
  state = { isOpen: false };
  toggle = () => {};
  render() {
    return (
      <div className="navbar-top">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">DepartureDelayViewer</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Start</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/seltat/ITPR-semcon">
                  Github
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Seiten
                </DropdownToggle>
                <DropdownMenu left>
                  <DropdownItem header>Christoph Großauer</DropdownItem>
                  <DropdownItem href="/top/airline">
                    Task 1: Fluglinien mit meisten Flügen
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem header>Felix Winterleitner</DropdownItem>
                  <DropdownItem href="/delay/country/">
                    Task 2: Durchschnittliches DepartureDelay nach Land
                  </DropdownItem>
                  <DropdownItem href="/delay/airline/">
                    Task 2: Durchschnittliches DepartureDelay nach Fluglinie
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem header>Andreas Bachl</DropdownItem>
                  <DropdownItem href="/delay/airport/">
                    Task 3: Durchschnittliches DepartureDelay je Flughafen
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem header>Franz Reischl</DropdownItem>
                  <DropdownItem href="/franz" disabled>
                    Task 4: (noch nicht eingebunden)
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>
              <img height="20" src={Logo}></img>
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;

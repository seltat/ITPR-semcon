import React, { Component } from "react";

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
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
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
                  <DropdownItem href="/top/airline/">
                    Task 1: Fluglinien mit meisten Flügen
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem header>Felix Winterleitner</DropdownItem>
                  <DropdownItem href="/delay/country/">
                    Task 2: Durchschnittliches DepartureDelay nach Land
                  </DropdownItem>
                  <DropdownItem href="/delay/country-alternative/">
                    Task 2: Durchschnittliches DepartureDelay nach Land - nur 1 SPARQL query
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
                  <DropdownItem href="/comparisons/avgdelaymonth">
                    Task 4: Durchschnittliches DepartureDelay je Monat und Jahr
                  </DropdownItem>
                  <DropdownItem href="/comparisons/avgdelaymonthweekday">
                    Task 4: Durchschnittliches DepartureDelay nach Wochentage je Monat
                  </DropdownItem>
                  <DropdownItem href="/comparisons/avgdelayyearweekday">
                    Task 4: Durchschnittliches DepartureDelay nach Wochentag je Jahr
                  </DropdownItem>
                  <DropdownItem href="/comparisons/avgdelayhourmonth">
                    Task 4: Durchschnittliches DepartureDelay nach Planabflugzeit je Monat
                  </DropdownItem>
                  <DropdownItem href="/comparisons/sumdelaymonth">
                    Task 4: Summe DepartureDelay je Monat fortlaufend
                  </DropdownItem>
                  <DropdownItem href="/comparisons/avgdelayyear">
                    Task 4: Durchschnittliches DepartureDelay je Jahr
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;

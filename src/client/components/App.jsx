import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';

export const Welcome = props => (
  <h1>Welcome to React, {props.username || '...'}</h1>
);
Welcome.propTypes = {
  username: PropTypes.string,
};

class App extends Component {
  constructor(props) {
    console.log(JSON.stringify(process.env));
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      username: null,
      apiUrl: process.env.API_URL,
    };
  }

  async componentDidMount() {
    const response = await fetch(`${this.state.apiUrl}/api/getUsername`);
    const json = await response.json();
    this.setState({ username: json.username });
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <Navbar color="inverse" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  Github
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <Welcome username={this.state.username} />
                <p>
                  <Button
                    tag="a"
                    color="success"
                    size="large"
                    href="http://reactstrap.github.io"
                    target="_blank"
                  >
                    View Reactstrap Docs
                  </Button>
                </p>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default App;

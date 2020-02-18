import { LinkContainer } from 'react-router-bootstrap';
import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Nav, Navbar, NavItem, Button } from 'react-bootstrap';
import Routes from './Routes';
import { Auth } from 'aws-amplify';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			isAuthenticating: true
		};
	}

	async componentDidMount() {
		try {
			if (await Auth.currentSession()) {
				this.userHasAuthenticated(true);
			}
		} catch (e) {
			if (e !== 'No current user') {
				alert(e);
			}
		}

		this.setState({ isAuthenticating: false });
	}

	userHasAuthenticated = authenticated => {
		this.setState({ isAuthenticated: authenticated });
	};

	handleLogout = async event => {
		await Auth.signOut();

		this.userHasAuthenticated(false);
		this.props.history.push('/');
	};
	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};
		return (
			<div className="App container">
				{/* <Navbar fluid collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">Test application</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav pullRight>
							{this.state.isAuthenticated ? (
								<NavItem onClick={this.handleLogout}>Logout</NavItem>
							) : (
								<Fragment>
									<LinkContainer to="/signup">
										<NavItem>Signup</NavItem>
									</LinkContainer>
									<LinkContainer to="/login">
										<NavItem>Login</NavItem>
									</LinkContainer>
								</Fragment>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar> */}
				<div className="frame">
					<div className="frame-header">
					<Link to="/"><img src="https://training.eras.jp/common/img/reboot_logo.svg" className="logo"alt="ERAS LOGO"/></Link>
					</div>
					<div className="frame-body">
						<Routes childProps={childProps} />
					</div>
					<div className="isLogged">
					{this.state.isAuthenticated ? (<Button className="logout" onClick={this.handleLogout}>Logout</Button>
					):(
						<Button className="hidden"></Button>
					)}
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(App);

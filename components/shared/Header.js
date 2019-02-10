import React from 'react';
import Link from 'next/link';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem} from 'reactstrap';

import auth0Client from '../../services/auth0';


const MyNavLink =  (props) => {

    const {route, name} = props;

    return(
        <Link href={route}>
            <a className='nav-link port-navbar-link' > {name} </a>
        </Link>
    )
}

const Login = props => {
    return (
        <span className='nav-link port-navbar-link clickable'  onClick={auth0Client.login} >
            Login
        </span>
    )
}

const Logout = props => {
    return (
        <span className='nav-link port-navbar-link clickable' onClick={auth0Client.logout} >
            Logout
        </span>
    )
}


class Header extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){
        const {isAuthenticated} = this.props;
        return(
            <div>
                <Navbar className='port-navbar port-default absolute' color="transparent" dark expand="md">
                    <NavbarBrand className='port-navbar-brand' href="/">Andy Parinas</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className='port-navbar-item' >
                                <MyNavLink route='/' name='Home' />
                            </NavItem>
                            <NavItem className='port-navbar-item' >
                                <MyNavLink route='/portfolios' name='Portfolios' />
                            </NavItem>
                            <NavItem className='port-navbar-item' >
                                <MyNavLink route='/blogs' name='Blogs' />
                            </NavItem>
                            <NavItem className='port-navbar-item' >
                                <MyNavLink route='/cv' name='CV' />
                            </NavItem>
                            <NavItem className='port-navbar-item' >
                                <MyNavLink route='/about' name='About' />
                            </NavItem>
                            <NavItem className='port-navbar-item' >
                                { isAuthenticated? <Logout /> : <Login />  } 
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }



}

export default Header;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import {Route} from 'react-router-dom'
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
    <header>
        <Navbar bg="primary" variant ='dark' expand="lg" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand >Home</Navbar.Brand>
            </LinkContainer>
            <SearchBox />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto align-items-center">
                <LinkContainer to='/cart'>
                    <Nav.Link>
                        <i className = 'fas fa-shopping-cart px-2'></i>
                        Cart
                    </Nav.Link>
                </LinkContainer>
                <a href='https://localhost:8501/' className='header_search'>Search</a>
                {userInfo 
                ? (
                    <NavDropdown
                    title={userInfo.name}
                    id='username'>
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/'>
                        <NavDropdown.Item onClick={
                            logoutHandler
                        }>
                            Logout
                        </NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                )
                :(
                <LinkContainer to='/login'>
                    <Nav.Link>
                        <i className = 'fas fa-user px-2'></i>
                        Login
                    </Nav.Link>
                </LinkContainer>
                )
                }
                {userInfo && userInfo.isAdmin && (
                    <NavDropdown
                    title='admin'
                    id='adminmenu'>
                        <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                )} 
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header
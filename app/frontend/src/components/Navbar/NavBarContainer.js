import React from 'react'
import './NavBarContainer.css'
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import SearchBox from '../SearchBox';
const NavBarContainer = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
    <div className="header">
        <div className="grid">
            <nav className="header__navbar">
                <ul className="header__navbar-list">
                    <li className="header__navbar-item header__navbar--hasqr header__navbar-seperate">
                        Welcome to Coduo To Shop For Your Dream!
                    </li>
                    <li className="header__navbar-item">
                        <span className="header__navbar-title-nopointer">Connect</span>
                        <a href="" className="header__navbar-icon-link">
                            <i className=" header__navbar-icon fa-brands fa-facebook"></i>
                        </a>
                        <a href="" className="header__navbar-icon-link">
                            <i className=" header__navbar-icon fa-brands fa-instagram"></i>
                        </a>
                    </li>
                </ul>  
                <ul className="header__navbar-list">
                    <li className="header__navbar-item">
                        <a href="" className="header__navbar-item-link">
                            <i className=" header__navbar-icon fa-solid fa-circle-question"></i>
                            Help</a>
                    </li>
                    {userInfo
                    ?(<li className="header__navbar-item header__navbar-user">
                        <span className="header__navbar-user-name">Hello, {userInfo.name}</span>
                        <ul className="header__navbar-user-menu">
                            <li className="header__navbar-menu-item">
                                <a href="/profile">
                                    My Account
                                </a>
                            </li>
                            <li className="header__navbar-menu-item header__navbar-menu-item-seperate">
                                <a href ='' onClick={logoutHandler}>
                                    Log Out
                                </a>
                            </li>
                        </ul>
                    </li>)
                    :(
                        <>
                        <li className="header__navbar-item strong header__navbar-seperate">
                        <a href="/register"> Register</a></li>
                        <li className="header__navbar-item strong">
                        <a href="/login"> Login</a></li>
                        </>
                    )
                    }
                </ul>              
            </nav>
        </div>
    </div>
  )
}

export default NavBarContainer
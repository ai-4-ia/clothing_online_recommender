import React from 'react'
import'./NavBarBottom.css'
const NavBarBottom = () => {
  return (
    <div className="header">
        <div className="grid">
            <div className="header__menu grid__row">
                <ul className="header__menu-choice">
                    <li className="header__menu-low">
                        <a href="../demo/main_page.html" className="header__menu-low-title">
                            Home
                        </a>
                    </li>
                    <li className="header__menu-high">
                        <a href="../demo/shop__4.html"className="header__menu-high-title">
                            Shop
                        </a>
                    </li>
                    <li className="header__menu-low">
                        <a href="../demo/contact.html">
                            <span className="header__menu-low-title">
                                Contact
                            </span>
                        </a>
                    </li>
                    <li className="header__menu-low">
                        <div className="header__menu-high-head">
                            <a href="../demo/vendor_list.html">
                                <span className="header__menu-low-title">
                                    Shirt
                                </span>
                            </a>
                        </div>
                    </li>
                    <li className="header__menu-low">
                        <div className="header__menu-high-head">
                            <a href="../demo/vendor_list.html">
                                <span className="header__menu-low-title">
                                    Outwear
                                </span>
                            </a>
                        </div>
                    </li>
                    <li className="header__menu-low">
                        <div className="header__menu-high-head">
                            <a href="../demo/vendor_list.html">
                                <span className="header__menu-low-title">
                                    Shorts
                                </span>
                            </a>
                        </div>
                    </li>
                    <li className="header__menu-low">
                        <div className="header__menu-high-head">
                            <a href="../demo/vendor_list.html">
                                <span className="header__menu-low-title">
                                    Trousers
                                </span>
                            </a>
                        </div>
                    </li>
                    <li className="header__menu-low">
                        <div className="header__menu-high-head">
                            <a href="../demo/vendor_list.html">
                                <span className="header__menu-low-title">
                                    Skirt
                                </span>
                            </a>
                        </div>
                    </li>
                    <li className="header__menu-low">
                        <div className="header__menu-high-head">
                            <a href="../demo/vendor_list.html">
                                <span className="header__menu-low-title">
                                    Dress
                                </span>
                            </a>
                        </div>
                    </li>
                </ul>
                <div className="header__menu-tag">
                    <div className="header__menu-tag-component">
                        <i className="fa-solid fa-mobile-screen-button"></i>
                        <div className="header__menu-tag-aside">
                            <span>
                                Call Us
                            </span>
                            <span>
                                (+84)953764451
                            </span>
                        </div>
                    </div>
                    <div className="header__menu-tag-component">
                        <i className="fa-solid fa-at"></i>
                        <div className="header__menu-tag-aside">
                            <span>
                                Email Us
                            </span>
                            <span>
                                abc@example.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NavBarBottom
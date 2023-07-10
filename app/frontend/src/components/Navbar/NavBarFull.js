import React from 'react';
import NavBarContainer from './NavBarContainer';
import NavBarSearch from './NavBarSearch';
import NavBarBottom from './NavBarBottom';
import SearchBox from '../SearchBox';
const NavBarFull = () => {
    return (
        <>
            <NavBarContainer />
            <NavBarSearch/>
            {/* <SearchBox /> */}
            <NavBarBottom />
        </>
    );
};

export default NavBarFull;

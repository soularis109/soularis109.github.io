import React from 'react';
import './navbar.css';
import Pagination from './Pagination'

const NavBar = () => {
    return (
        <div className='background'>
            <div className='title'>Movies</div>
            <div className='pagination'><Pagination/></div>
        </div>
    );
};

export default NavBar;
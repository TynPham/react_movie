import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';
import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';

function Footer(props) {
    return (
        <div className='footer' style={{backgroundImage: `url(${bg})`}}>
            <div className="footer_content container">
                <div className="footer_content_logo">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <Link to='/'>tMovies</Link>
                    </div>
                </div>
                <div className="footer_content_menus">
                    <div className="footer_content_menu">
                        <Link to='/'>Home</Link>
                        <Link to='/'>Contact Us</Link>
                        <Link to='/'>Term of services</Link>
                        <Link to='/'>About us</Link>
                    </div>
                    <div className="footer_content_menu">
                        <Link to='/'>Live</Link>
                        <Link to='/'>FAQ</Link>
                        <Link to='/'>Premium</Link>
                        <Link to='/'>Pravacy police</Link>
                    </div>
                    <div className="footer_content_menu">
                        <Link to='/'>You must watch</Link>
                        <Link to='/'>Recent release</Link>
                        <Link to='/'>Top IMDB</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
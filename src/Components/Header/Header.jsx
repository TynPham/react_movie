import React, { useEffect, useRef } from 'react';
import {Link , useLocation} from 'react-router-dom'
import logo from '../../assets/tmovie.png'
import './Header.scss'


const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    }
]

function Header(props) {

    const location = useLocation();
    const headerRef = useRef(null);

    const active = headerNav.findIndex(e => e.path === location.pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            }
            else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll' , shrinkHeader);
        return () =>{
            window.removeEventListener('scroll' , shrinkHeader)
        }
    } , [])
    

    return (
        <div ref={headerRef} className='header'>
            <div className="header_wrap container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <Link to='/'>tMovies</Link>
                </div>
                <ul className="header_nav">
                    {headerNav.map((item , index) => (
                        <li key={index} className={`${index === active ? 'active' : ''}`}>
                            <Link to={item.path}>
                                {item.display}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header;
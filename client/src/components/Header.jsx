import './Header.scss';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Input, useRangeSlider } from '@chakra-ui/react';

export default function Header() {
  const { pathname } = useLocation();

  const openNav = () => {
    document.getElementById("myNav").style.height = "100%";
  }

  const closeNav = () => {
    document.getElementById("myNav").style.height = "0%";
  }
  const logout = () => localStorage.clear();
  const obj = JSON.parse(localStorage.getItem("user"));
  const name = obj.first_name;
  return (

    <nav className={pathname === '/' ? 'nav-bar' : ''}>

      <div id="myNav" className="overlay">
        <div className='overlay-header'>
          <h1 className='overlay-header--logo'>Triplogo</h1>
          <FontAwesomeIcon icon={faXmark} className="closebtn" onClick={closeNav}/>
        </div>

        <div className="overlay-content">
          <a href="/">Home</a>
          <a href="/">Explore</a>
          <a href="/">Start Planning</a>
          <a href="/">My Trips</a>
          <a href="register">Account</a>
          <a href="/" onClick={logout}>Log Out</a>
        </div>
      </div>

      <h1 id='home-page-logo' className='overlay-header--logo' style={{display: pathname === '/' ? '' : 'none'}}>Triplogo</h1>
      
      <a href='/' className='nav-logo' style={{display: pathname === '/' ? 'none' : ''}}>Triplogo</a>

      <div className='search-bar' style={{width: pathname === '/' ? '90%' : ''}}>
        <Input 
          placeholder='Your destination' 
          className='search-bar--input'
        />

        <button type="submit" name="search-submit" className='search-bar--button'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <span>{localStorage.getItem("user") ? `Hello ${name}` : null}</span>
      </div>
      <FontAwesomeIcon icon={faBars} className="drop-down" onClick={openNav}/>
    </nav>
  );
}

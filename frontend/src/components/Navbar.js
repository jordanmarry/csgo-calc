import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twirl as Hamburger } from 'hamburger-react';
import '../style/Navbar.css';


function Navbar() {

  const [isOpen, setOpen] = useState(false);

  const handleClick = () => setOpen(!isOpen)
  
  const closeMobileMenu = () => setOpen(false);

  return (
    <nav className="navbar">

      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <img src='../logo192.png' alt='logo'/> CSGO Investment Calculator
        </Link>
        

        <div className='menu-icon' onClick={handleClick}>
            <Hamburger duration={0.3} toggled={isOpen} toggle={setOpen} />
        </div>


        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to="/" className='nav-links' onClick={closeMobileMenu} reloadDocument>
              Home
            </Link>
          </li>
          <li className='nav-item' >
            <Link to="/add-item" className='nav-links' onClick={closeMobileMenu} reloadDocument>
              Add Item
            </Link>
          </li>
            
        </ul>


      </div>

    </nav>
  )
}
export default Navbar
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavHeader = () => (
  <header>
    <NavLink to="/" className="nav-btn" activeClassName="is-active" exact={true}>Home</NavLink>
    <NavLink to="/about" className="nav-btn" activeClassName="is-active">About</NavLink>
    <NavLink to="/projects" className="nav-btn" activeClassName="is-active">Projects</NavLink>
    <NavLink to="/blog" className="nav-btn" activeClassName="is-active">Blog</NavLink>
    <NavLink to="/hobby" className="nav-btn" activeClassName="is-active">Hobby</NavLink>
    <NavLink to="/contact" className="nav-btn" activeClassName="is-active">Contact</NavLink>
  </header>
);

export default NavHeader;
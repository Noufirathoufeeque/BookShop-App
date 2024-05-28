import React from 'react'
import {  Navbar,Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import headerImg from '../assets/Images/book-logo.png'




function Header() {
  return (
    <Navbar className="bg-danger">
        <Container>
          <Link to = {'/'} style={{textDecoration:'none'}} className='fw-bolder p-2'>
          <Navbar.Brand style={{color:'white'}} className='fs-5'>
          <img style={{width:'40px'}} src={headerImg} alt="" />
            Kids Reading Room
          </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        
          
        </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Header
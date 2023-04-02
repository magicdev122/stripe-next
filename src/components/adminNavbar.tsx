import React from 'react'
import style from '../styles/vendor.module.css'

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Offcanvas from 'react-bootstrap/Offcanvas';






export default function VendorNavbar() {
 

  

 
  return (
    <>
     <Navbar   expand={'lg'} className={`mb-3  shadow-sm ${style.navbarContainer}`}>
          <Container >
            <Navbar.Brand style={{color:"#1F7B6F"}}>Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
           {Navbar ?  <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title style={{color:"#1F7B6F"}} id={`offcanvasNavbarLabel-expand-lg`}>
                  Admin Dashboard
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link  href="/adminDashboard" className={`mx-3 ${style.menu} `}>Products</Nav.Link>

                 
                  <Nav.Link href="/adminOrders" className={`mx-3 ${style.menu} `}> Orders</Nav.Link>
                  <Nav.Link href="/" className={`mx-3 ${style.menu} `}> Sign out</Nav.Link>

                  
                  





                  
                </Nav>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>:'loading...'}
          </Container>
        </Navbar>
    
    
    </>
  )
}

import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';

function Footer() {

    const currentYear= new Date().getFullYear();
  return (
    <footer>
    <Container>
        <Row>
            <Col className='text-center py-3'>
                <p>E-commerce website by <a href="https://github.com/roudraneelash">RoudraneelAsh</a> &copy; {currentYear}</p>
            </Col>
        </Row>
    </Container>
</footer>

  )
}

export default Footer;

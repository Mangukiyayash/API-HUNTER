import React from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Header() {
    const datacount = useSelector((state) => state.count);

    return (
        <div>
            <br />
            <Navbar expand="lg" className="p-0 container rounded-3" style={{ background: "white", marginTop: "-30px", border: "1px solid #5F0F40", backgroundImage: 'linear-gradient(to right,  #FEFAE0 , #49563e, #49563e , #FEFAE0)' }}>
                <Container className='body'>
                    <Form inline style={{ margin: '30px' }}>
                        <Row>
                            <Col xs="auto">
                                <Form.Control type="text" placeholder="Search By Name.." className="rounded-1" />
                            </Col>
                        </Row>
                    </Form>
                    <Link to={"/"} >HOME</Link>
                    <div className='position-relative' style={{ marginLeft: '46%' }}>
                        <Link to={'/cart'}>
                            <TiShoppingCart className='icon' />
                            <span className='cart'>{datacount}</span>
                        </Link>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function Product() {
    let [Product, setProduct] = useState([]);
    let [productCat, setProductCat] = useState([]);


    useEffect(() => {
        let getProduct = () => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products")
                    .then(async (res) => {
                        let data = await res.json();
                        setProduct(data);
                    })
                    .catch((err) => {
                        console.log("data not found");
                    });
            }, 500);
        };

        let getProductCat = () => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products/categories")
                    .then(async (res) => {
                        let cat = await res.json();
                        setProductCat(cat);
                    })
                    .catch((err) => {
                        console.log('Category Data Not Found');
                    })
            }, 500)
        }


        getProduct();
        getProductCat();
    }, setProduct, setProductCat);

    let getProductID = (cata) => {
        console.log(cata);
        setTimeout(() => {

            var url = '';
            cata == 'All' ? url = "https://fakestoreapi.com/products" : url = "https://fakestoreapi.com/products/category/" + cata;

            fetch(url)
                .then(async (res) => {
                    let ProD = await res.json();
                    setProduct(ProD);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, )
    }

    return (
        <div>
            <Container>
                <Nav variant="tabs" className='filter'>
                    <Nav.Item>
                        <Nav.Link style={{ marginLeft:'10px'}} onClick={() => getProductID('All')}>All</Nav.Link>
                    </Nav.Item>
                    {productCat.map((v, i) => {
                        return (
                            <Nav.Item>
                                <Nav.Link onClick={(e) => getProductID(v)}>{v}</Nav.Link>
                            </Nav.Item>
                        )
                    })
                    }
                </Nav>
            </Container>

            <div className="d-flex justify-content-center flex-wrap my-5">
                
                {Product.map((v, i) => {
                    return (
                        <div className="m-3">
                        <Container fluid="md">
                        <Row>
                        <Col>
                        <Card style={{ width: '400px' ,  height: "450px",border:"1px solid #5F0F40" , borderRadius:'20px' }}>
                        <Card.Img variant="top" src={v.image} width={200} height={200} style={{ objectFit: "contain", padding: "10px" }} />
                        <Card.Body>
                        <Card.Title style={{ height: "55px",  color: "#5f0f40bd" }}>{v.title}</Card.Title>
                        <Card.Text className="fs-4">₹ {Math.round(v.price * 85)}  <span style={{ color: "#5f0f40bd", marginLeft: "15px", textDecoration: "line-through" }}>₹ {Math.round(v.price * 85 + 123)}</span></Card.Text>
                        <Card.Text className='title'>{v.rating.count > 100 ? <span style={{ color: "green" }}>Available Stock</span> : <span style={{ color: "red" }}>Law Stock</span>}</Card.Text>
                        <Link className="btn" to={"/productDetail/" + v.id}><Button style={{borderRadius:'50px'}} className="button position-absolute bottom-0 start-0 end-0 mx-5 my-4" >View More →</Button></Link>
                        </Card.Body>
                        </Card>``
                        </Col>
                        </Row>
                        </Container>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}   

export default Product;
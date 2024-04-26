import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { deleteCart } from '../Redux/Actions/CartAction';

function ProductCart() {
    const [cart, setCart] = useState([]);
    let sum = 0;
    const dispatch = useDispatch();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    const deleteData = (pos) => {
        const localData = JSON.parse(localStorage.getItem('cart')) || [];
        localData.splice(pos, 1);
        localStorage.setItem('cart', JSON.stringify(localData));
        setCart(localData);
        dispatch(deleteCart());
    }

    return (
        <Container>
            <br />
            <h1 className='mb-5' style={{ color: 'white' }}>Cart Details</h1>
            <Link to={"/"}>
                <Button variant='none' style={{ color: "#ffffff" }} className="fs-1 position-fixed top-0 start-0  px-3 py-1">
                    <IoArrowBackCircle />
                </Button>
            </Link>
            <Table bordered style={{ marginBottom: "300px" }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{ verticalAlign: "middle" }}>
                    {cart.map((v, i) => (
                        <tr key={i}>
                            <td><p>{i + 1}.</p></td>
                            <td><p><img src={v.image} width="100px" height="100px" style={{ objectFit: "contain" }} alt={v.name}></img></p></td>
                            <td><p>{v.name}</p></td>
                            <td><p>{v.productQuantity}</p></td>
                            <td style={{ whiteSpace: "nowrap" }}><p>₹ {v.price} /-</p></td>
                            <td style={{ whiteSpace: "nowrap" }}><p>₹ {v.price * v.productQuantity} /-</p></td>
                            <td>
                                <Button className='button mb-3' onClick={() => deleteData(i)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={5}>Total Amount</td>
                        <td>
                            {cart.map((v, i) => {
                                sum = sum + v.price * v.productQuantity + 50;
                            
                            })}
                            <span style={{ whiteSpace: "nowrap" }}>₹ {sum} /-</span>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default ProductCart;

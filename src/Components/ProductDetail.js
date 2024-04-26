
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { IoArrowBackCircle } from "react-icons/io5";
import { addToCart } from "../Redux/Actions/CartAction";

function ProductDetail() {

    let [product, setProduct] = useState({});
    let ProductID = useParams()
    let [Quanti, SetQuanti] = useState(1);
    let [cart, SetCart] = useState([]);
    let dispatch = useDispatch();


    let submitCartData = (e) => {

        e.preventDefault();

        let DataObj = {
            id: ProductID.id,
            name: product.title,
            image: product.image,
            productQuantity: Quanti,
            price: Math.round(product.price * 83)
        }
        console.log(DataObj);
        console.log(DataObj.productQuantity);

        let pos = cart.findIndex((v, i) => v.id === ProductID.id);
        if (pos == -1) {
            let datacart = [...cart, DataObj];
            SetCart(datacart);
            localStorage.setItem('cart', JSON.stringify(datacart));
            dispatch(addToCart());
            alert("Product Added Successfully..!!")
        }
        else {
            alert("Product are already into cart..!!");
        }
    }

    let getValue = (e) => {
        let v = parseInt(e.target.value);
        console.log(v);
        SetQuanti(v);
    }

    useEffect(() => {
        let getProduct = () => {
            setTimeout(() => {
                fetch("https://fakestoreapi.com/products/" + ProductID.id)
                    .then(async (res) => {
                        let data = await res.json();
                        setProduct(data);
                    })
                    .catch((err) => {
                        console.log("data not found");
                    });
            }, 500);
        };
    
        let getCartProduct = () => {
            let cartitem = JSON.parse(localStorage.getItem('cart'));
            if (cartitem == null) {
                SetCart([]);
            } else {
                SetCart(cartitem);
            }
        };
    
        getCartProduct();
        getProduct();
    
    }, [ProductID.id]);
    
    return (
        <div className="container">
                 <h2 style={{marginTop:"20px"}}>Product Details</h2><br />
                <div className="d-flex align-items-center py-5" style={{ backgroundColor: "white", border:'3px solid black' , borderRadius: "10px", width: "100%" }}>

                    <div className="w-40" style={{ borderRight: "3px solid black" }}>
                        <img src={product.image} alt="" width={"500px"} height={"500px"} style={{ padding: "50px", borderRadius: "30px", objectFit: "contain" }} />
                    </div>

                        <div className="w-60 px-3">
                            <div><h3 >{product.title}</h3><br /></div>
                                <div className="d-flex justify-content-center">
                                    {product.rating && (
                                        <div>

                                            <div className="d-flex justify-content-center">
                                                <h5 style={{ marginRight: "10px" }}>₹{Math.round(product.price * 85)}.00 /-</h5>
                                                <h5 style={{ marginLeft: "10px" }}><del>₹ {Math.round(product.price * 85 + 123)}</del></h5>
                                            </div><br />

                                            <div className="d-flex justify-content-evenly">
                                                <h5>{product.rating.rate} / 5  ⭐</h5>
                                                <h5>{Math.round(product.rating.rate * 537)} Reviews</h5>    
                                            </div><br />

                                            <p>{product.description}</p>
                                            <form method="post" onSubmit={(e) => submitCartData(e)} className="d-flex w-50 mx-auto">
                                                <input type="hidden" name="productQuantity" value={Quanti} />
                                                <Form.Control type="number" name="productQuantity" min="1" max="10" value={Quanti} onChange={(e) => getValue(e)} aria-describedby="passwordHelpBlock" />
                                                <button className="btn button mx-3" style={{ fontSize: "17px", textWrap: "nowrap" }} type="submit">Add To Cart</button>
                                            </form>

                                        </div>
                                    )}
                                </div>
                        </div>
                </div>

        </div>
    )
}
export default ProductDetail;
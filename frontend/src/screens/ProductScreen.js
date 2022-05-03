import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { detailsProduct } from '../actions/productActions';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ProductScreen(props) {

    const dispatch = useDispatch();

    const params = useParams();
    const { id: productId } = params;  
      
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;
    const navigate = useNavigate();
    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [dispatch, productId] );

    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`);
    };
  return (
    <div>
        {loading? <LoadingBox></LoadingBox>
        : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
        ) : (
            <div>
            <a href="/">Back to Home</a>
            <div className='row top'>
                <div className='col-2'>
                    <img className='large' src={product.image} alt={product.name}></img>
                </div>
                <div className='col-1'>
                    <ul>
                        <li>
                            <h1> {product.name} </h1>
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                        </li>
                        <li>
                            Price : {product.price} TND
                        </li>
                        <li>
                            Description : 
                            <p> {product.description} </p>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                Seller{' '}
                                <h2>
                                <Link to={`/seller/${product.seller._id}`}>
                                    {product.seller.seller.name}
                                </Link>
                                </h2>
                                <Rating 
                                    rating={product.seller.seller.rating} 
                                    numReviews={product.seller.seller.numReviews}>
                                </Rating>
                            </li>
                            <li>
                                <div className='row'> 
                                    <div>Price</div>
                                    <div className='price'> {product.price} TND </div>
                                </div>
                            </li>
                            <li>
                                <div className='row'> 
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <span className='success'> In Stock </span> 
                                        ) : (
                                            <span className='danger'> Unvailable</span>
                                        )}
                                    </div>  
                                </div>
                            </li>

                            {
                                product.countInStock > 0 && (

                                    <>
                                        <li>
                                            <div className='row'>
                                                <div>Quantity</div>
                                                <div>
                                                    <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map( (x) => (
                                                                <option key={ x + 1 } value={ x + 1 }> { x + 1 }</option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button 
                                                style={{marginLeft :"0px"}}
                                                onClick={addToCartHandler}
                                                className='primary block'>Add to Cart
                                            </button>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )}
    </div>


  )
}

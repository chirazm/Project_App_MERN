import  Axios  from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen() {
  const params = useParams();
  const { id: productId } = params;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    if (successUpdate ) {
        navigate('/productlist/seller');
      }
   
      if(!product || (product._id !== productId || successUpdate)) {
          dispatch({type: PRODUCT_UPDATE_RESET});
          dispatch(detailsProduct(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setBrand(product.brand);
        setDescription(product.description);
      }
  }, [product, dispatch, productId, navigate, successUpdate, userInfo.isAdmin, userInfo.isSeller]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
    }))
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Product </h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (<LoadingBox></LoadingBox>
        ) : error ? (<MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name" style={{marginLeft:"50px"}}>Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                style={{marginLeft:"50px"}}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price" style={{marginLeft:"50px"}}>Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                style={{marginLeft:"50px"}}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="image" style={{marginLeft:"50px"}}>Image File</label>
              <input
                type="file"
                id="image"
                label="Choose Image"
                style={{marginLeft:"50px"}}
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category" style={{marginLeft:"50px"}}>Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                style={{marginLeft:"50px"}}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand" style={{marginLeft:"50px"}}>Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                style={{marginLeft:"50px"}}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock" style={{marginLeft:"50px"}}>Count In Stock</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                style={{marginLeft:"50px"}}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description" style={{marginLeft:"50px"}}>Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                style={{marginLeft:"50px", maxWidth:"400px"}}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit" style={{marginLeft:"160px"}}>
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

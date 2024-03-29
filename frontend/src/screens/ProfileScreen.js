import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import MessageBoxTimer from '../components/MessageBoxTimer';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import  Axios  from 'axios';

export default function ProfileScreen() {
    const dispatch = useDispatch();

    const  [name, setName] = useState('');
    const  [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');
    const  [confirmPassword, setConfirmPassword] = useState('');

    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { 
        success: successUpdate, 
        error: errorUpdate, 
        loading : loadingUpdate,
    } = userUpdateProfile;
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        if (user.seller) {
            setSellerName(user.seller.name);
            setSellerLogo(user.seller.logo);
            setSellerDescription(user.seller.description);
      }
    }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched')
        } else {
            dispatch(updateUserProfile ({
                userId: user._id, 
                name, 
                email, 
                password,
                sellerName,
                sellerLogo,
                sellerDescription,
            }));
        }
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
      setSellerLogo(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div>
        <form className='form' onSubmit={submitHandler} style={{marginTop:"15px", maxWidth:"500px"}}>
            <div>
                <h1>User Profile</h1>
                <div>
                    {
                        loading? <LoadingBox></LoadingBox>
                        :
                        error? <MessageBox variant="danger"> {error} </MessageBox>
                        : (
                        <>
                            {loadingUpdate && <LoadingBox></LoadingBox> }
                            {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                            {successUpdate && (<MessageBoxTimer variant="success">Profile Updated Successfully</MessageBoxTimer>)}
                            <br/>
                            <div>
                                <label htmlFor='name' style={{ marginLeft: "30px" }}> Name </label>
                                <input
                                id="name"
                                type="text"
                                placeholder = "Enter name"
                                value={name}
                                onChange= {(e) => setName(e.target.value)}
                                style={{ marginLeft: "30px" }}
                                ></input>
                            </div>
                            <br/> 
                            <div>
                                <label htmlFor='email' style={{ marginLeft: "30px" }}> Email </label>
                                <input
                                id="email"
                                type="email"
                                placeholder = "Enter email"
                                value={email}
                                onChange= {(e) => setEmail(e.target.value)}
                                style={{ marginLeft: "30px" }}
                                ></input>
                            </div>
                            <br/> 
                            <div>
                                <label htmlFor='password' style={{ marginLeft: "30px" }}> Password </label>
                                <input
                                id="password"
                                type="password"
                                placeholder = "Enter password"
                                onChange= {(e) => setPassword(e.target.value)}

                                style={{ marginLeft: "30px" }}
                                ></input>
                            </div>
                            <br/> 
                            <div>
                                <label htmlFor='confirmPassword' style={{ marginLeft: "30px" }}> Confirm Password </label>
                                <input
                                id="confirmPassword"
                                type="password"
                                placeholder = "Enter confirm password"
                                onChange= {(e) => setConfirmPassword(e.target.value)}
                                style={{ marginLeft: "30px" }}
                                ></input>
                            </div>
                    
                            {
                                user.isSeller && (
                                    <>
                                    <h1>Seller Profile</h1>
                                    <div>
                                        <label htmlFor='sellerName' style={{ marginLeft: "30px" }}>Seller Name</label>
                                        <input
                                            id="sellerName"
                                            type="text"
                                            placeholder = "Enter Seller Name"
                                            value= {sellerName}
                                            style={{ marginLeft: "30px" }}
                                            onChange= {(e) => setSellerName(e.target.value)}
                                        ></input>
                                    </div>
                                    <br/>
                                    <div>
                                        <label htmlFor='sellerLogo' style={{ marginLeft: "30px" }}>Seller Logo</label>
                                        <input
                                            id="sellerLogo"
                                            type="file"
                                            placeholder = "Enter Seller Logo"
                                            style={{ marginLeft: "30px" }}
                                            onChange= {uploadFileHandler}
                                        ></input>
                                                     {loadingUpload && <LoadingBox></LoadingBox>}
                                         {errorUpload && (
                                            <MessageBox variant="danger">{errorUpload}</MessageBox>
                                        )}
                                    </div>
                                    <br/>
                                    <div>
                                        <label htmlFor='sellerDescription' style={{ marginLeft: "30px" }}>Seller Description</label>
                                        <input
                                            id="sellerDescription"
                                            type="text"
                                            placeholder = "Enter Seller Description"
                                            value= {sellerDescription}
                                            style={{ marginLeft: "30px" }}
                                            onChange= {(e) => setSellerDescription(e.target.value)}
                                        ></input>
                                    </div>
                                    </>
                                )
                            }
                            <br/> <br/>
                            <div>
                                <label/>
                                <button 
                                    className='primary' 
                                    type='submit'
                                    style={{ marginLeft: "86px" }}
                                >
                                    Update
                                </button>
                            </div>
                        </>

                        )}
                </div>
            </div>
        </form>
        <br/>  <br/>
    </div>
  )
}

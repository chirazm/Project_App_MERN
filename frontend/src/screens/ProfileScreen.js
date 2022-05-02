import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {
    const dispatch = useDispatch();

    const  [name, setName] = useState('');
    const  [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');
    const  [confirmPassword, setConfirmPassword] = useState('');

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
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched')
        } else {
            dispatch(updateUserProfile ({userId: user._id, name, email, password}));
        }
    }

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
                            {successUpdate && (<MessageBox variant="success">Profile Updated Successfully</MessageBox>)}
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
                            <br/> <br/>
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
                            <br/> <br/>
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
                            <br/> <br/>
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
    </div>
  )
}

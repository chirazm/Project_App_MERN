import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProfileScreen() {
    const dispatch = useDispatch();

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    useEffect(() => {
        dispatch(detailsUser(userInfo._id));
    }, [dispatch, userInfo._id]);

    const submitHandler = (e) => {
        e.preventDefault();
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
                        :
                        <>
                            <div>
                                <label htmlFor='name' style={{ marginLeft: "30px" }}> Name </label>
                                <input
                                id="name"
                                type="text"
                                placeholder = "Enter name"
                                value={user.name}
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
                                value={user.email}
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
                                style={{ marginLeft: "30px" }}
                                ></input>
                            </div>
                            <br/> <br/> 
                            <div>
                                <label/>
                                <button 
                                    className='primary' 
                                    type='submit'
                                    style={{ marginLeft: "90px" }}
                                >
                                    Update
                                </button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </form>
    </div>
  )
}

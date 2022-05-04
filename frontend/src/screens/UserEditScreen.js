import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstant';

export default function UserEditScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: userId } = params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, navigate, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler} style={{maxWidth:"500px"}}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
          {successUpdate && (<MessageBox variant="success">Profile Updated Successfully</MessageBox>)}

        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name" 
                style= {{marginLeft:"23px"}}
              >Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style= {{marginLeft:"23px"}}
              ></input>
            </div>
            <div>
              <label htmlFor="email"
                style= {{marginLeft:"23px"}}
              >Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style= {{marginLeft:"23px"}}
              ></input>
            </div>
            <br/>
            <div>
              <label htmlFor="isSeller"
                style= {{marginLeft:"26px"}}
              >Is Seller</label>
              <input
                id="isSeller"
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
                style= {{marginTop:"-25px", marginLeft:"-60px"}}

              ></input>
            </div>
            <br/>
            <div>
              <label htmlFor="isAdmin"
                style= {{marginLeft:"26px"}}
              >Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                style= {{marginTop:"-26px", marginLeft:"-60px"}}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
            <br/> <br/>
            <div>
              <button 
              type="submit" 
              className="primary"
              style= {{marginLeft:"140px"}}
              >
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
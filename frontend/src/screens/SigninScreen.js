import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux'
import { signin } from '../actions/userActions'
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return(
    <div>
      <form className='form' onSubmit={submitHandler}>
          <div>
            <h1>Sign In</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger"> {error} </MessageBox>}
          <div>
            <label htmlFor='email'>Email address :</label>
            <div>
            <Input  
             addonBefore={<UserOutlined className='User-form-item-icon' />}
             type='email'
             id="email"
             placeholder='Enter email'
             required
             onChange={(e) => setEmail(e.target.value)}
           ></Input>
            </div>
            <br/>

          </div>
          <div>
            <label htmlFor='password'> Password :</label>
            <Input
              addonBefore={<LockOutlined  className="Lock-form-item-icon" /> }
              type='password'
              id="password"
              placeholder='Enter password'
              required
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </div>
          <div>
            <label/>
            <button className='primary' type='submit'>Sign In</button>
          </div>
          <div>
            <label/>
            <div className='register-link'>
              New Customer ? {' '}
              <Link to="/register"> Create your account</Link>
            </div>
          </div>
      </form>
    </div>
  )
}
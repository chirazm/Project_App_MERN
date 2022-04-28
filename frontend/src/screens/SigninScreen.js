import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function SigninScreen(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitHandler = (e) =>{
    e.preventDefault();
  }
  return(
    <div>
      <form className='form' onSubmit={submitHandler}>
          <div>
            <h1>Sign In</h1>
          </div>
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
import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useRef } from "react";
import { CircularProgress } from '@material-ui/core';

import './LoginForm.css';
import { useAuth } from '../../contexts/AuthContext';
import { LoginCall } from '../../api-call';

const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { isFetching, dispatch } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    console.log(emailValue, passwordValue);
    LoginCall({email: emailValue, password: passwordValue}, dispatch);
  }
  return (
    <div 
    style={{'height': '100%'}} 
    className='d-flex justify-content-center align-items-center'
    >
      <Form onSubmit={handleSubmit} className='cover'>
        <Form.Group
          className="mb-3"
          controlId="email"
          style={{ "maxWidth": "600px" }}
        >
          <Form.Control ref={emailRef} type="email" placeholder="Enter your email" />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="password"
          style={{ "maxWidth": "600px" }}
        >
          <Form.Control ref={passwordRef} type="password" placeholder="Enter your password" />
        </Form.Group>
        <div
          className="d-flex justify-content-center"
          style={{ "maxWidth": "600px" }}
        >
          <Button type="submit" disabled={isFetching}>
            {isFetching ? (<CircularProgress style={{'color': 'white'}} size='20px'/>) :'Login'}
          </Button>
        </div>
        <hr/>
        <div className="d-flex justify-content-center"

        >
          <Link type='button' className='bg-success'>Register</Link>
      </div>
      </Form>           
    </div>
  );
};

export default LoginForm;

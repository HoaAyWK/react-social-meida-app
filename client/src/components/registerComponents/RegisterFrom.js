import axios from 'axios';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import './RegisterForm.css';

const RegisterForm = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordAgainRef = useRef();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nameValue = nameRef.current.value;
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;
        const passwordAgainValue = passwordAgainRef.current.value;
        if (passwordAgainValue !== passwordValue) {
            passwordAgainRef.current.setCustomValidity('Password does not match!');
        } else {
            const user = {
                name: nameValue,
                email: emailValue,
                password: passwordValue
            };
            try {
                await axios.post('http://localhost:5000/api/signup', user);
                history.push('/login');
            } catch(err) {
                console.log(err);
            }
        }
    }
    return (
        <Form className='px-3 pt-3 pb-2 rounded-2 form-layout' onSubmit={handleSubmit} style={{'width': '60%'}}>
            <div className='form-desc'>
                <h2>Register</h2>
                <p>Easy to create new account</p>
            </div>
            <Form.Group className='mb-3' controlId='nameField'>                
                <Form.Control type='text' placeholder='Enter your name' ref={nameRef} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='emailField'>               
                <Form.Control type='email' placeholder='Enter your email'ref={emailRef} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='passwordField'>                
                <Form.Control type='password' placeholder='Enter password' ref={passwordRef} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='passwordAgainField'>               
                <Form.Control type='password' placeholder='Enter again your password' ref={passwordAgainRef} />
            </Form.Group>
            <div className='d-flex justify-content-center'>
                <Button type='submit'>Register</Button>
            </div>
        </Form>
    );
};

export default RegisterForm;
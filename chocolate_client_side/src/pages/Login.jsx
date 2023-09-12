import React, { useContext, useState } from 'react'
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import useTitle from '../hooks/useTitle';

function Login() {
  useTitle('Login')
    const {googleHandler,logInUser,setUserEmail}=useContext(AuthContext)
    const navigate=useNavigate()

    const googleBtnClicked=()=>{
        googleHandler()
        .then((result) => {
            // Signed in 
            const user = result.user;
            setUserEmail(user.email)
            // console.log(user.email)
            navigate('/home')
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    const submiHandler=(e)=>{
        e.preventDefault()
        const form=e.target
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        logInUser(email,password)
        .then((result) => {
            // Signed in 
            const user = result.user;
            // console.log(user)
            setUserEmail(user.email)
            navigate('/home')
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
        
    }

  return (
    <div className='my-5 w-50 mx-auto mb-5 border border-3 border-danger px-5'>
    <h4 className='text-center mt-5'>Please Login</h4>

    <Form onSubmit={submiHandler}>
     
        <Form.Group className="mb-3 ">
            <Form.Label>Email</Form.Label>
            <Form.Control name='email' placeholder="Enter your email" />
        </Form.Group>
 
        <Form.Group className="mb-3 ">
            <Form.Label>Password</Form.Label>
            <Form.Control name='password' placeholder="Enter your password" />
        </Form.Group>
        <Button type='submit' className='my-2 d-block' variant="danger">login</Button>
  <p className='text-lg font-medium '>Dont’t Have An Account ? <Link className='font-medium text-danger' to='/signup'>Register</Link></p>

  <hr/>
  <Button onClick={googleBtnClicked} className='mt-2 mb-4' style={{borderRadius:'50%'}} variant="danger">G</Button>
    </Form>

</div>
  )
}

export default Login
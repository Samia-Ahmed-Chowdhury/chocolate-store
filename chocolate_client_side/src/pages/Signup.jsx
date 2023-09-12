import React, { useContext, useState } from 'react'
import { Button, Form } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import useTitle from '../hooks/useTitle';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
    useTitle('SignUp')
    const { googleHandler, createUser,userName, setUserName, setUserEmail,setPhotoUrl,updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    const [showPass, setShowPass] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [error, setError] = useState('')

    const googleBtnClicked = () => {
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

    const passwordValidating = (e) => {
        const password = e.target.value;
        if (!/(?=.*[A-Z])/.test(password)) {
            setPasswordError("At least one uppercase character");
            return
        }
        else if (!/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password)) {
            setPasswordError("At least one special character");
            return
        }
        else if (!/^(?=.*[0-9]).*$/.test(password)) {
            setPasswordError("At least one digit character");
            return
        }
        else if (!/^\S*$/.test(password)) {
            setPasswordError("No white space");
            return
        }
        else if (!/(?=.{6,})/.test(password)) {
            setPasswordError("Password must be at least 6 characters long")
            return
        }
        else {
            console.log('welcom')
            setPasswordError('');
            e.target.style.border = '1px solid #ced4da'
            return
        }
    }

    const submiHandler = (e) => {
        e.preventDefault()
        setPasswordError('')
        setError('')
        const form = e.target
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo_url = e.target.photo_url.value;

        if (passwordError) {
            e.target.password.focus();
            e.target.password.style.border = '2px solid red'
            return;
        }
        e.target.password.style.border = '1px solid #ced4da'

        createUser(name, email, password)
        .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateUserProfile(name, photo_url)
                    .then(() => {
                        setUserName(user.displayName);
                        setUserEmail(user.email)
                        setPhotoUrl(user.photoURL)
                        navigate('/home')
                    }).catch((error) => {
                        const errorMessage = error.message;
                        console.log(errorMessage)
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                setError(errorMessage)
            });
    }

    return (
        <div className='my-5 w-50 mx-auto mb-5 border border-3 border-danger px-5'>
            <h4 className='text-center mt-5'>SignUp here!!!!</h4>
            {
                    error && <p style={{ color: 'red',textAlign:'center' }}  >{error}</p>
                }
            <Form onSubmit={submiHandler}>
                <Form.Group className="mb-3 ">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3 ">
                    <Form.Label>Photo Url</Form.Label>
                    <Form.Control type="url" name="photo_url" placeholder="Enter Your Photo URL" />
                </Form.Group>
                <Form.Group className="mb-3 ">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name='email' placeholder="Enter your email" />
                </Form.Group>

                <Form.Group className="mb-3 position-relative">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='' type={showPass ? 'text' : 'password'} name="password" onChange={passwordValidating} placeholder="Enter your password" />
                    {
                        showPass ?
                            <FaEye onClick={() => setShowPass(!showPass)} className="position-absolute  top-50" style={{right:"20px"}} />
                            : <FaEyeSlash onClick={() => setShowPass(!showPass)} className="position-absolute top-50 " style={{right:"20px"}} />
                    }
                    {
                        passwordError &&
                        <p style={{ color: 'red' }} className="error">{passwordError}</p>
                    }
                </Form.Group>
                <Button type='submit' className='my-2 d-block' variant="danger">signup</Button>
                <p className='text-lg font-medium '> Have An Account Already ? <Link className='font-medium text-danger' to='/'>Login</Link></p>
                <hr />
                <Button onClick={googleBtnClicked} className='mt-2 mb-4' style={{ borderRadius: '50%' }} variant="danger">G</Button>
            </Form>

        </div>
    )
}

export default Signup
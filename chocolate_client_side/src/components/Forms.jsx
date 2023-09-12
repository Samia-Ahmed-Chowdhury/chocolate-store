import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import { Helmet } from 'react-helmet';
import TitleHalmet from '../TitleHalmet';

function Forms() {
    useTitle('Add')
    {/* //dynamic Title */ }
    // const urlTitle=useLocation()
    // const dynamicTitle=urlTitle.pathname
    // console.log(dynamicTitle)

    const [check, setCheck] = useState('')
    const navigate = useNavigate()

    const submiHandler = (e) => {
        e.preventDefault()
        const form = e.target;
        const photo = form.photo.value;
        const name = form.name.value;
        const category = form.category.value;
        const price = form.price.value;
        const date = form.date.value;
        console.log(photo, name, category, price, date, check)

        const itemInfo = {
            photo, name, category, price, date, check
        }

        fetch('http://localhost:3000/items', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(itemInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data?.insertedId > 0) {
                    alert('added successfully')
                    navigate('/')
                    // form.reset()
                }
            })
    }

    return (
        <>
            {/* //dynamic Title */}
            {/* <TitleHalmet dynamicTitle={dynamicTitle}/> */}
            <div className='w-50 mx-auto mb-5 border border-3 border-danger px-5'>
                <Link to='/'><Button className='mt-5 mb-4' variant="danger">All Chocolate</Button></Link>
                <h4 className='text-center'>Add new One</h4>

                <Form onSubmit={submiHandler}>
                    <Form.Group className="mb-3 ">
                        <Form.Label>Photo URl</Form.Label>
                        <Form.Control name='photo' placeholder="Put photo url" />
                    </Form.Group>
                    <Form.Group className="mb-3 ">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' placeholder="Put Name" />
                    </Form.Group>

                    <Form.Select name='category' className="mb-3 ">
                        <option>Select Category</option>
                        <option value="creamy">Creamy</option>
                        <option value="silk">Silk</option>
                        <option value="candy">Candy</option>
                    </Form.Select>

                    <Form.Group className="mb-3 ">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name='price' placeholder="Put Price" />
                    </Form.Group>

                    <Form.Group className="mb-3 ">
                        <Form.Label>Manufactuer Date</Form.Label>
                        <Form.Control name='date' type='date' placeholder="Put Price" />
                    </Form.Group>

                    <Form.Group className="mb-3 ">
                        <Form.Label>Sale Status</Form.Label>
                        <div className='d-flex gap-4'>
                            <Form.Check checked={check === 'order'} onChange={() => setCheck('order')} label="Ordered" />
                            <Form.Check checked={check === 'unorder'} onChange={() => setCheck('unorder')} label="Unordered" />
                        </div>
                    </Form.Group>
                    <Button type='submit' className='mt-5 mb-4 d-block' variant="danger">Add</Button>
                </Form>

            </div>
        </>
    )
}

export default Forms
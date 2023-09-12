import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap"
import {useLoaderData, useNavigate } from 'react-router-dom';
import useTitle from '../hooks/useTitle';

function Updated() {

    useTitle('Update')
    const loadedItem = useLoaderData()
    console.log(loadedItem)

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

        fetch(`http://localhost:3000/items/${loadedItem._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(itemInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data?.modifiedCount>0) {
                    alert('Update successfully')
                    navigate('/')
                    // form.reset()
                }
            })
    }


    return (
        <div className='w-50 mx-auto mb-5 border border-3 border-danger p-5 my-5'>
            <h4 className='text-center'>Update here!!!</h4>

            <Form onSubmit={submiHandler}>
                <Form.Group className="mb-3 ">
                    <Form.Label>Photo URl</Form.Label>
                    <Form.Control name='photo' defaultValue={loadedItem.photo} placeholder="Put photo url" />
                </Form.Group>
                <Form.Group className="mb-3 ">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name='name' defaultValue={loadedItem.name} placeholder="Put Name" />
                </Form.Group>

                <Form.Select name='category' defaultValue={loadedItem.category} className="mb-3 ">
                    <option>Select Category</option>
                    <option value="creamy">Creamy</option>
                    <option value="silk">Silk</option>
                    <option value="candy">Candy</option>
                </Form.Select>

                <Form.Group className="mb-3 ">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name='price' defaultValue={loadedItem.price} placeholder="Put Price" />
                </Form.Group>

                <Form.Group className="mb-3 ">
                    <Form.Label>Manufactuer Date</Form.Label>
                    <Form.Control name='date' defaultValue={loadedItem.date} type='date' placeholder="Put Price" />
                </Form.Group>

                <Form.Group className="mb-3 ">
                    <Form.Label>Sale Status</Form.Label>
                    <div className='d-flex gap-4'>
                        <Form.Check
                         defaultChecked={loadedItem.check === 'order' ? true : false}
                        checked={check === 'order'} onChange={() => setCheck('order')}
                         label="Ordered" />
                        <Form.Check defaultChecked={loadedItem.check === 'unorder' ? true : false}
                        checked={check === 'unorder'} onChange={() => setCheck('unorder')} label="Unordered" />
                    </div>
                </Form.Group>
                <Button type='submit'  className='mt-5 mb-4 d-block' variant="danger">Update</Button>
            </Form>

        </div>
    )
}

export default Updated
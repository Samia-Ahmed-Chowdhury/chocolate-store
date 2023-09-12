import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useLoaderData } from 'react-router-dom';
import useTitle from '../hooks/useTitle';

function View() {
useTitle('Details')
  const itemLoaded = useLoaderData()
  // console.log(itemLoaded)
  const { photo, category, date, name, price, check } = itemLoaded

  return (
    <>
      <Link to='/' className='my-5 pt-5 px-5 ml-5' ><Button className='my-5 ml-5' variant="danger">back</Button></Link>
      <Card className='my-5 mx-auto' style={{ width: '28rem' }}>
        <Card.Img variant="top" style={{ height: "28rem" }} src={photo} />
        <Card.Body>
          <Card.Title>Name: {name}</Card.Title>
          <Card.Text>
            Category: {category}
          </Card.Text>
          <Card.Text>
            Date: {date}
          </Card.Text>
          <Card.Text>
            Price: {price}
          </Card.Text>
          <Card.Text>
            Check: {check}
          </Card.Text>
          <div className='d-flex gap-3 my-auto'>
            <Button variant="info">Edit</Button>
            <Button variant="danger">Delete</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default View

import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Row({item,deleteHandler}) {

    const{_id,category,photo,name,price,date,check} =item

    return (
        <>
            <tr>
                <td>1</td>
                <td><img style={{width:'50px',height:'35px'}} src={photo}/></td>
                <td>{name}</td>
                <td>{category}</td>
                <td>{price}</td>
                <td>{date}</td>
                <td>{check}</td>
                <td className='d-flex gap-3 my-auto'>
                    <Link to={`items/${_id}`}><Button variant="success">View</Button></Link>
                    <Link to={`update/${_id}`}><Button variant="info">Edit</Button></Link>
                    <Button onClick={()=>deleteHandler(_id)} variant="danger">Delete</Button>
                </td>
            </tr>
        </>
    )
}

export default Row
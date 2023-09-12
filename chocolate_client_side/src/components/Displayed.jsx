import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Row from './Row';
import { AuthContext } from '../provider/AuthProvider';

function Displayed() {

    // const [loadedData, setLoadedData] = useState([])
    const{loadedData, setLoadedData}=useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3000/items`)
            .then(res => res.json())
            .then(data => setLoadedData(data))
    }, [])

    const deleteHandler = (_id) => {
        const confarmation = confirm('are you sure to delete')
        if (confarmation) {
            fetch(`http://localhost:3000/items/${_id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remainingItems = loadedData.filter(ele => ele._id !== _id)
                    setLoadedData(remainingItems)
                })


        }
    }

    return (
        <div className=''>
            <h3 className='text-center mb-4'>Displayed Chocolate</h3>
            <Table striped bordered hover variant="danger">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>photo</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Manufactuer Date </th>
                        <th>Sale Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loadedData.map(item => <Row key={item._id} item={item} deleteHandler={deleteHandler} />)
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Displayed
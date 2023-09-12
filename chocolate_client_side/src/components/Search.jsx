import React, { useContext } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Search() {
    const{loadedData, setLoadedData}=useContext(AuthContext)
    const navigate=useNavigate()

    const searchHandler = (e) => {
        e.preventDefault()
        const seachValue = e.target.searchField.value;
        console.log(seachValue)
        fetch(`http://localhost:3000/item?search=${seachValue}`,{
            method:'GET',
            headers:{
                authorization:`Bearer ${localStorage.getItem('access-token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
           if(!data.error){
            setLoadedData(data)
           }
           else{
            alert('please login first')
            navigate('login')
           }
        })
    }

    return (
        <div className=' d-flex justify-content-end mb-5'>
            <Form onSubmit={searchHandler} className="d-flex w-50">
                <Form.Control
                    name='searchField'
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button type='submit' variant="outline-success">Search</Button>
            </Form>
        </div>
    )
}

export default Search
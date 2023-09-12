import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

function ProtectedRoutes({ children }) {
  const {userEmail} = useContext(AuthContext)
  const location = useLocation();
  // console.log(location)


  if (userEmail) {
    return children
  }
  return <Navigate to="/" state={{ from: location }} replace ></Navigate>;
}

export default ProtectedRoutes

import { Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from "react-router-dom";
import Displayed from "./components/Displayed";
import { useContext } from "react";
import { AuthContext } from "./provider/AuthProvider";
import Search from "./components/Search";
import useTitle from "./hooks/useTitle";
import TitleHalmet from "./TitleHalmet";


function App() {

  useTitle('Home')

  const { userName, photoUrl, logOut } = useContext(AuthContext)
  return (
    <>

      <div className="d-flex justify-content-end px-5 align-items-center my-5 gap-4">
   
              <img title={userName} src={photoUrl} />
        

        <Link to='/'><Button onClick={logOut} variant="danger">LogOut</Button></Link>
      </div>

      <div className="my-5 px-5">
        <div className="d-flex justify-content-between mb-4">
          <Link to='form'><Button variant="danger">+ Add New Chocolate</Button></Link>

        </div>
        <Search />
        <Displayed />
      </div>
    </>
  )
}

export default App

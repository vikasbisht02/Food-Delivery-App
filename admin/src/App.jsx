import {Routes, Route}  from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from "./pages/Add/Add"
import List from "./pages/List/List"
import Orders from "./pages/Orders/Orders"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const url = "https://food-delivery-app-client-z9k0.onrender.com";
  return (
    <div>
      <ToastContainer/>
        <Navbar/>
        <hr />
        <div className="app-content">
            <Sidebar/>
            <Routes>
              <Route path="/add" element={<Add url={url}/>}></Route>
              <Route path="/list" element={<List url={url}/>}></Route>
              <Route path="/orders" url={url} element={<Orders url={url}/>}></Route>
            </Routes>
        </div>
    </div>
  )
}

export default App
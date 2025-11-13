import React from 'react'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import Mainlayout from '../layout/Mainlayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Homepages from '../Sections/Homepages'
const Approutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Mainlayout/>}>
          {/* <Route index element={<Homepages/>}/> */}
        </Route>
        <Route path='*' element={<div className='text-3xl font-bold text-center mt-20'>404 Page Not Found</div>}>
        </Route>
    </Routes>
    <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default Approutes
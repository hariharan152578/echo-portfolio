import React from 'react'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import Mainlayout from '../layout/Mainlayout'
import Homepages from '../Sections/Homepages'
const Approutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Mainlayout/>}>
          <Route index element={<Homepages/>}/>
        </Route>
        <Route path='*' element={<div className='text-3xl font-bold text-center mt-20'>404 Page Not Found</div>}>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Approutes
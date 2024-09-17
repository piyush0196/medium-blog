import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Blog } from './pages/Blog'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'


function App() {

  return (
    <> 
      <BrowserRouter>
      <Routes>
        <Route path='/signup' Component={Signup} />
        <Route path='/signin' Component={Signin} />
        <Route path='/blog/:id' Component={Blog} />
        <Route path='/blogs' Component={Blogs} />
        <Route path='/publish' Component={Publish} />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import About from './Components/About';
import Blogs from './Components/Blogs';
import AddBlog from './Components/AddBlog';
import GetBlog from './Components/GetBlog';
import UpdateBlog from './Components/UpdateBlog';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path='/add-blog' element={<AddBlog/>}/>
        <Route path='/getBlog' element={<GetBlog/>}/>
        <Route path='/updateBlog' element={<UpdateBlog/>}/>
      </Routes>
      </>
  );
}

export default App;

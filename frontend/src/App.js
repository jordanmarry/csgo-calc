import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddItem from './pages/AddItem';

function App() {

  return (
    <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={< Home />}/>
            <Route path='/add-item' element={< AddItem />}/>
          </Routes>
        </Router>
    </div>
  );
}


export default App;

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Material from './components/Material';
import Style from './Style.css';
import Header from './components/Header';
import Welcome from './page/Welcome';
function App() {
 // const [count, setCount] = useState(0)

  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<Welcome/>}/>

          
        </Routes>
      </Router>
    </>
  )
}

export default App

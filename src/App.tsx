import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";

import Homepage from './pages/Homepage';
import Gamepage from './pages/Gamepage';
import Mainlayout from './Mainlayout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout/>}>
          <Route path='/' element ={<Homepage/>}/>
          <Route path='/game' element ={<Gamepage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
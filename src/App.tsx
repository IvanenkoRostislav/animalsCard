import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";

import Homepage from './pages/Homepage';
import Gamepage from './pages/Gamepage';
import Gameover from './pages/Gameover';
import Mainlayout from './Mainlayout';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout/>}>
          <Route path='/' element ={<Homepage/>}/>
          <Route path='/game' element ={<Gamepage/>}/>
          <Route path='/gameover' element ={<Gameover/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
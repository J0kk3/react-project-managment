import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Styles
import './App.css'

//Pages & Components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';



function App ()
{
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path='/' element={ <Dashboard /> } />
            <Route path='/create' element={ <Create /> } />
            <Route path='project/:id' element={ <Project /> } />
            <Route path='login' element={ <Login /> } />
            <Route path='signup' element={ <Signup /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App
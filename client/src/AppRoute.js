import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Todo from './components/Todo';
import Login from './components/auth/login';
import Signup from './components/auth/Signup';
import PublicRoutes from './components/utils/PublicRoutes';
import ProtectedRoutes from './components/utils/ProtectedRoutes';

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoutes></PublicRoutes>}>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<Signup/>}/>
        </Route>
        <Route element={<ProtectedRoutes></ProtectedRoutes>}>
        <Route path="/home" element={<Todo />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoute;
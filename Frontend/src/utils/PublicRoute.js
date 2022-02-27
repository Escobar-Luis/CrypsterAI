import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

function PublicRoute({isLogged}) {
  return isLogged ? <Navigate to='/dashboard'/> :<Outlet/>
}

export default PublicRoute;

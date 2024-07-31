import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Dashboard from './pages/Dashboard';
import Signin from './components/components2/SignIn/SignIn';
import UsersTable from './components/components2/Tables-Users/Tables-Users'
import Analytics from './components/components2/Analytics/analytics'
import Shop from './components/components2/Shop/shop';
import Pay from './components/components2/Shop/pay';
import Faqs from './components/components2/FAQs/FAQs';
import { AuthProvider, useAuth } from './components/components2/SignIn/authcontext';

function PrivateRoute({children}){
  const {auth} = useAuth;
  if(!auth.isAuthenticades){
    return <Navigate to="/"/>
  }
  return children
}


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); 
  return (
    
    <AuthProvider>
      <Routes>
        <Route exact path="/home" element={<Dashboard />} />
        <Route exact path="/" element={<Signin />} />
        <Route exact path="/table-users" element={<UsersTable/>}></Route>
       <Route exact path="/home/Analytics" element={<Analytics/>}></Route>
       <Route exact path="/home/shop" element={<Shop/>}></Route>
       <Route exact path="/home/pay" element={<Pay/>}></Route>
       <Route exact path="/home/Faqs" element={<Faqs/>}></Route>
      </Routes>
    </AuthProvider>
    

  );
}

export default App;

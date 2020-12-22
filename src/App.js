import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from "./components/ForgotPassword";
import Payment from "./components/Payment";
import Cart from "./components/Cart";
import UserPage from "./components/UserPage";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import EmailConfirmation from "./components/EmailConfirmation";
import ForgotConfirmation from "./components/ForgotConfirmation";
import ProductDetail from "./components/ProductDetail";
import Categories from "./components/Categories";
import SearchPage from "./components/SearchPage";
import Invoice from "./components/Invoice";
import SalesManager from "./components/SalesManager";
import ProductManager from "./components/ProductManager";
import ProtectedRoute from "./components/ProtectedRoute";
import UserOrders from './components/UserOrders';
import UserComments from './components/UserComments';
import UserInfo from './components/UserInfo';
import ChangeInfo from './components/ChangeInfo';
import ChangePassword from './components/ChangePassword';
import OrderInfo from './components/OrderInfo';

export default function App () {

  function hasVisitedAlert(){
    if( localStorage.getItem("hasVisited") === null ){
      localStorage.setItem("hasVisited", true)
      alert("Hi welcome to our awesome website. We are using your localstorage for keeping your information. Dont worry. You are safe with us. Have fun!!"
      )
  }}

  useEffect(() => { hasVisitedAlert();}, []);

  return (

    <BrowserRouter>
      <div className="App" >
      <Route component={Navbar}/>
        <Switch> 
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />

          <Route path='/signup' component={Signup} />
          <Route path='/emailconfirmation/:user_id' component={EmailConfirmation} />
          <Route path='/payment' component={Payment} />
          <Route path='/cart' component={Cart} />
          <Route path='/product/:product_id' component={ProductDetail} />
          <Route path='/category/:categories_id' component={Categories} />
          <Route path='/search/:search' component={SearchPage} />
          <Route path='/invoice/:order_id' component={Invoice} />
          <Route path='/forgotpassword' component={ForgotPassword} />
          <Route path='/forgotconfirmation' component={ForgotConfirmation} />

          <ProtectedRoute path='/salesmanager/:user_id' component={SalesManager} />
          <ProtectedRoute path='/productmanager/:user_id' component={ProductManager} />
          <ProtectedRoute path='/myaccount/:user_id' component={UserPage} />
          <ProtectedRoute path='/myorders/:user_id' component={UserOrders} />
          <ProtectedRoute path='/mycomments/:user_id' component={UserComments} />
          <ProtectedRoute path='/myinformation/:user_id' component={UserInfo} />
          <ProtectedRoute path='/changeinformation/:user_id' component={ChangeInfo} />
          <ProtectedRoute path='/changepassword/:user_id' component={ChangePassword} />
          <Route path='/orderdetail/:order_id' component={OrderInfo} />
          
          <Route path='*' component={() => <h1>ERROR 404: SORRY BUT WE DON'T HAVE THIS PAGE </h1> } />
        </Switch>
        <Footer />

      </div>
    </BrowserRouter>
    
  )
}
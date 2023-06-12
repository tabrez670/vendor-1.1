import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { NotFound } from "./Components/NotFound";
import { AddProducts } from "./Components/AddProducts";
import { FarmerRegister } from "./Components/FarmerRegister";
import { Cart } from "./Components/Cart";
// import './src/App.css';

import "../src/Components/styles/App.css";
// import {Chatbot} from "./Components/Chatbot";
import ViewProduct from "./Components/ViewProduct";
import { Contact } from "./Components/Contact";
// import Chatbot from "./Components/chatbot";



export const App = () => {
    
  const HomePageComponent = () => {
        const containerStyle = {
            width: '687 px',
            height: '250px',
          margin: '100px auto',
          backgroundColor: '#FECDAC',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        };
      
        const headingStyle = {
          color: '#333333',
          font: '34px',
        };
      
        const paragraphStyle = {
          color: '#666666',
        };

    return (
      <>
        <div className="navbar">
          <div>
            <Link className="btn btn-warning btn-md" to="/home">
              Home
            </Link>
          </div>
             <div>
            <Link className="btn btn-warning btn-md" to="signup">
              SignUp
            </Link>
            <Link class="btn btn-warning" to="login">
              Login
            </Link>
          </div>
        </div>
        <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome To MarketPlace For Local Venders</h1>
      {/* <p style={paragraphStyle}>Thank you for visiting. We hope you enjoy your stay.</p> */}
    </div>
      </>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Switch>
          {/* TODO: copy line 21, paste as it is then change the Component from home to other  */}
          <Route exact path="/" component={HomePageComponent} />
          <Route exact path="/home" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/add-products" component={AddProducts} />
          <Route path="/farmer-Register" component={FarmerRegister} />
          <Route path="/product" component={Home} />
          <Route path="/view/:productId" component={ViewProduct} />
          <Route path="/contact" component={Cart} />

          {/* try to use same  ^^^  variable name  in the url param as of the variable in useParams() in ViewProduct.js */}
          {/* <Route path="/products" component={Products}/> */}

          <Route path="/cart" component={Cart} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>

      {/* <Chatbot /> */}
    </>
  );
};

export default App;

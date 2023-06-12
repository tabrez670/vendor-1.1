import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";

import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { auth } from "../Config/Config";
import { useHistory } from "react-router-dom";

export const Navbar = ({ user, totalProducts }) => {
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/login");
    });
  };

  return (
    // <div className="container">
    <div className="navbar">
      <div className="leftside">
        <div className="logo">
          <Link className="navlink" to="/home">
            {/* <img src={logo} alt="logo" /> */}
            <h1 id="hed">DoorStep</h1>
          </Link>
        </div>
      </div>
      <div className="rightside">
        {!user && (
          <>
            <div>
              <Link className="btn btn-warning btn-md" to="/home">
                Home
              </Link>
            </div>

            <div>
              <Link className="btn btn-warning btn-md" to="signup">
                SignUp
              </Link>
            </div>
            <div>
              <Link class="btn btn-warning" to="login">
                Login
              </Link>
            </div>
          </>
        )}

        {user && (
          <>
            <div>
              <Link className="navlink " id="usercolor" to="/home">
                Welcome, {user} 😊!
              </Link>
            </div>
            {/* <div className="cart-menu-btn">
              <Link className="navlink" to="cart">
                <Icon icon={shoppingCart} size={20} />
              </Link>
              <span className="cart-indicator">{totalProducts}</span>
            </div> */}

            <div>
              {user === "admin" && (
                <Link className="btn btn-warning btn-md" to="add-products">
                  Add Products
                </Link>
              )}
            </div>
            <div>
              <Link className="btn btn-warning btn-md" to="farmer-Register">
                Register here
              </Link>
            </div>

            <div className="btn btn-warning btn-md" onClick={handleLogout}>
              Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
};

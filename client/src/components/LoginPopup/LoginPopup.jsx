import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" name="" id="" placeholder="Your name" required />
          )}
          <input type="email" placeholder="Your email" required name="" id="" />
          <input type="password" placeholder="Password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>

        {currState === "Sign Up" ? (
          <div>
           <div className="login-popup-condition">
           <input type="checkbox" name="" id="" required />
           <p>By continuing, i agree ti the terms of use & privacy policy.</p>
           </div>
            <p className="page">
              Create a new account?{" "}
              <span onClick={() => setCurrState("Login")}>Click here</span>
            </p>
          </div>
        ) : (
          <p>
            Alreay have an account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

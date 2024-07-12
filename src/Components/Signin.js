import React, { useState } from "react";
import "./Styles/signin.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signin(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      toast.error("enter valid credentials");
    } else {
      toast.success("Signed in successfully!");
      navigate("/dashboard");
    }
  };
  return (
    <div className="sign-in-wrapper">
      <ToastContainer />
      <div className="sign-in-header">
        <h1 className="text-3xl">Sign In </h1>
        <p>Sign in to your existing account</p>
      </div>
      <div className="sign-in-content-wrapper">
        <div className="sign-in-form-wrapper flex flex-col content-wrapper p-7">
          <form>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="email"
                  className="sign-in-label block text-sm leading-6"
                >
                  Email address
                </label>
                <div className="sign-in-input mt-2">
                  <input
                    type="text"
                    name="email"
                    onChange={onChange}
                    value={credentials.email}
                    className="block flex-1 border-0 py-1.5 pl-1 text-black-900 placeholder-gray focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="name@email.com"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="password"
                  className="sign-in-label block text-sm leading-6"
                >
                  Password
                </label>
                <div className="sign-in-input mt-2">
                  <input
                    type="password"
                    name="password"
                    onChange={onChange}
                    value={credentials.password}
                    autoComplete="password"
                    className="block flex-1 border-0 py-1.5 pl-1 text-black-900 placeholder-gray focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="password"
                  />
                </div>
              </div>
            </div>
            <div className="forgot-password">
              <Link to="/">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className="sign-in-btn rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mt-2"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div className="sign-up-link">
        <p>Don't have an account?</p>
        <button
          onClick={props.handleIsSigninChange}
          style={{ cursor: "pointer" }}
        >
          {" "}
          Register here
        </button>
      </div>
    </div>
  );
}

export default Signin;

import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

function Background() {
  const [isSignIn, setSignIn] = useState(true);
  const handleIsSigninChange = () => {
    setSignIn(!isSignIn);
  };
  return (
    <>
      {isSignIn ? (
        <Signin handleIsSigninChange={handleIsSigninChange} />
      ) : (
        <Signup handleIsSigninChange={handleIsSigninChange} />
      )}
    </>
  );
}

export default Background;

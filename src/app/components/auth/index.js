import React, { Fragment } from "react";
import Login from "./Login";
import SignUp from "./SignUp"
import Logout from "./Logout"

export const Forms = ({ currentUser }) => {
  return (
    <Fragment>
       {currentUser ? 
         <Logout /> :
          <div>
            <Login  />
            <SignUp />
          </div>
       }      
    </Fragment>
  );
};
 
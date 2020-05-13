import React, { useState, useEffect } from "react";
import ResetForm from "./ResetForm";
import { Input } from "./Input";
import { signIn } from "../../api/Auth"

const Login = () => {
  const [isValid, setValid] = useState(false)
  const [isExpanded, setExpanded] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [credentials, setCredentials] = useState({
    email: "", 
    psw: ""
  })
  const handleClick = () => {
    const signupEl = document.getElementById("signup");
    signupEl.scrollIntoView({behavior: "smooth"});
  }
  const expand = () => {
    setExpanded(!isExpanded)
  }
  const submit = () => {
    signIn(credentials)
    .then(() => window.location.reload())
    .catch(error => setFeedback(error.message))
  }
  useEffect(() => {
    if(isExpanded) {
      const resetEl = document.getElementById("reset-form");
      resetEl.scrollIntoView({behavior: "smooth"})
    } 
  }, [isExpanded])

  useEffect(() => {
    setValid(credentials.email.length > 0 && credentials.psw.length > 0)
  }, [credentials])
  return (
    <div className="col-sm-10 offset-1" id="login">
      <h2>Login</h2>
      <form onSubmit={e => {
        e.preventDefault()
        submit()
      }}><hr />
        <small className="crimson">{feedback}</small>
        <br />
        <Input
          classNames="form-control login-form"
          value={credentials.email}
          type="email"
          action={e => {
              setCredentials({...credentials, email: e.target.value})
          }}
        />
        <Input
          classNames="form-control login-form"
          value={credentials.psw}
          type="password"
          action={e => {
            setCredentials({...credentials, psw: e.target.value})
        }}
        />

        <div>
          <div className="buttons">
            <button
              type="button" 
              className="btn btn-link violet text-left"  
              onClick={() => expand()}>
              reset
            </button>
            <button
              type="button"
              className="btn btn-link text-right violet"
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => handleClick()}
            >
              create new account
            </button>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary bg-violet btn-sm white float-right"
          >
            Submit
          </button>
        </div>
      </form>
      <br />
      <br />
       <ResetForm
       classNames="form-control"
       property="email"
       isExpanded={isExpanded}
    /> 
    
    </div>
  );
};

export default Login;

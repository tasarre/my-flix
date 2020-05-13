import React, { useState, useEffect} from "react";
import { Input } from "./Input";
import { signUp, sendEmailVerification } from "../../api/Auth"

const messages = {
  MESSAGE_CREATED: 'account successfully created'
}

const SignUp = () => {
  const [isValid, setValid] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [credentials, setCredentials] = useState({
    email: "", 
    psw: ""
  })
  useEffect(() => {
    setValid(credentials.email.length > 0 && credentials.psw.length > 0)
  }, [credentials])
  useEffect(() => {
    if (feedback != messages.MESSAGE_CREATED) {
      return
    }
    const timer = setTimeout(() => {
        window.jQuery("#modal").modal('hide')
        setFeedback("")
      }, 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [feedback])
  return (
    <div>
      <div className="col-sm-10 offset-1" id="signup">
        <h2>Sign Up</h2>
        <form onSubmit={e => {
          e.preventDefault()
          signUp(credentials)
          .then(success => {
            if (success) {
              setFeedback(messages.MESSAGE_CREATED)
              setCredentials({
                email: "", 
                psw: ""
              })
              sendEmailVerification()  
            }
          })
          .catch(error => {
            setFeedback(error.message)
          })
        }}>
          <hr /> 
          <small className={feedback != messages.MESSAGE_CREATED && 'crimson'}>{feedback}</small>
          <div class="form-group">
            <Input
              classNames="form-control signup-form"
              value="email"
              type="email"
              value={credentials.email}
              action={e => {
                setCredentials({...credentials, email: e.target.value})
              }}
            >
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </Input>
            <Input
              classNames="form-control signup-form"
              value="password"
              type="password"
              value={credentials.psw}
              action={e => {
                setCredentials({...credentials, psw: e.target.value})
              }}
            >
              <small className="form-text text-muted">
                Choose a complex and secure password
              </small>
            </Input>
          </div>

          <br />
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-primary btn-sm white bg-violet float-right"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;

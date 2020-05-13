import React, { useState, Fragment } from "react";
import { resetPassword } from "../../api/Auth"

const ResetForm = ({ isExpanded }) => {
  const [email, setEmail] = useState("")
  const [feedback, setFeedback] = useState("")
  const reset = () => {
    resetPassword(email).then(success => {
      if (success) {
        setFeedback(`reset link sent to ${email}`)
        setEmail("")
        setTimeout(() => {
          window.jQuery("#modal").modal('hide')
          setFeedback("")
        }, 4000)
      }
    }).catch(error => {
      setFeedback(error.message)
    })
  
  }
  return (
    <Fragment>
          <br id="reset-form" />
          {isExpanded && 
          <Fragment>
            <hr />
            <br />
            <small>{feedback}</small>
            <div className="row">
                <h2>&nbsp; &nbsp; Reset Password</h2>
                <div className="form-group col-sm-10">
                <input type="email" className="form-control" onChange={e => setEmail(e.target.value)}/>
                </div>
                <button
                type="button"
                disabled={!email.length}
                className="col-sm btn btn-light btn-sm violet btn-reset"
                onClick={() => reset()}
                >
                send link
                </button>
            </div>
            <br />
            <hr />
            <br />
          </Fragment>
        }
    </Fragment>
  );
};
export default ResetForm;

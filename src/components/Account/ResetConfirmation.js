import React from 'react'

 const ResetConfirmation = () => {
  return (
    <div className="w-100 p-3 vh-100 text-center">
    <h1 className="display-3 m-5">Sports Rental!</h1>
    <h1 className="display-3 m-5"> </h1>
    <p className=" m-5"><strong>A password rest message has sent to your email</strong> Please click the link in that message to reset your password.</p>
   
    <p className="lead">If you have any question please <span>
                Call : <a href="tel: +14032920077">+1 403.292.0077</a>
              </span>.</p>
    <hr/>
   
    <p className="lead mb-5">
      <a className="btn btn-primary btn-sm " href="/" role="button">Continue to homepage</a>
    </p>
  </div>
  )
}

export default ResetConfirmation
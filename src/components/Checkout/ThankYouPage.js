import React from 'react'

 const ThankYouPage = () => {
  return (
    <div className="w-100 p-3 vh-100 text-center">
    <div className="success-msg  m-5">
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </svg>
      {/* <div className="title">Payment Successful</div> */}
    <h2 className="display-3 m-5 text-success">Thank You!</h2>
    <p className=" "><strong>Your cart is saved,</strong> waiting for payment to reserve. There is no guarantee of product availability before payment..</p>
   
    <p className="">If you have any question please <span>
                Call : <a href="tel: +14032920077">+1 403.292.0077</a>
              </span>.</p>
   
   
    <p className=" mb-5">
      <a className="btn btn-primary btn-sm " href="/" role="button">Continue to homepage</a>
    </p>
  </div>
  </div>
  )
}

export default ThankYouPage
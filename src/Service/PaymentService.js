import axios from "axios";

// import authHeader from "./authHeader";
 const API_URL = process.env.REACT_APP_API_SP_URL+"/api/payment";

class PaymentService {

//     chargePayment(amount, token){
//     return axios.post(API_URL +  "charge", "", {        
//          headers: {
//       token: token.id,
//       amount: amount,
//     },
// })
}
export default new PaymentService();

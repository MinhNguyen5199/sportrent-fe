import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_API_SP_URL + "/api/Reservation";

class ReservationService {
  getReservation() {
    return axios.get(API_URL + "/getReservation");
  }

  getReservationById(currentUser) {
    return axios.get(API_URL + "/getPickupInfo/" + currentUser);
  }

  getOrderHistory(currentUser) {
    return axios.get(API_URL + "/getOrderHistory/" + currentUser);
  }

  // fetch customer reservation information by reserve id
  customerReservationById(reserveId) {
    return axios.get(API_URL + "/getReservationById/" + reserveId);
  }
  // create a reservation
  MakeReservation(reserve, user_id) {
    return axios.post(API_URL + "/makeReservation/" + user_id, reserve);
  }
  // update a reservation Status
  updateReservationStatus(reservation_id, new_status) {
    return axios.put(API_URL + "/updateReservationStatus/" + reservation_id + "?reservation_status=" + new_status);
  }
  
  // add items to cart
  addCart(cart, user_id, email) {
    return axios.post(API_URL + "/addCart/" + user_id + "/" + email, cart);
  }

  // fetch items reserved by customer using  reserve id
  getReservedItemById(reserveId) {
    return axios.get(API_URL + "/getReservedItemById/" + reserveId);
  }

  // last record
  getReservationLastRecord() {
    return axios.get(API_URL + "/getReservationLastRecord");
  }
  searchReservation(keyword) {
    return axios.get(API_URL + "/searchReservation/" + keyword);
  }
  // Delete reserved item using item  id
  deleteReservedItemById(itemId){
    return axios.delete(API_URL + "/deleteReservedItemById/"+itemId);
  }

  updateReservation(reservation,reservedItemsForm,id){
    return axios.put(API_URL + "/updateReservation/"+id, reservation,reservedItemsForm);

  }


  getLatestTransaction(){
    return axios.get(API_URL + "/latestTransaction", { headers: authHeader() });
  }
}

export default new ReservationService();

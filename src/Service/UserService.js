
import axios from 'axios';
import authHeader from './authHeader';
const API_URL = process.env.REACT_APP_API_SP_URL + '/api/Customer';
const API_URL_Profile = process.env.REACT_APP_API_SP_URL + '/api/users';

class UserService {

  //logged in users
  getUsers() {
    return axios.get(API_URL + '/user', { headers: authHeader() });
  }
  //Delete user
  deleteUser(userId) {
    return axios.delete(API_URL + '/deleteUser/' + userId, { headers: authHeader() });
  }
  // Create New user
  createUser(user) {
    return axios.post(API_URL + '/createUser' + user, { headers: authHeader() });
  }

  //Update user information
  updateUser(userId, user) {
    return axios.put(API_URL + '/update/' + userId, user, { headers: authHeader() });
  }

  //Get selected user by using id
  getUserById(userId) {
    return axios.get(API_URL + '/userById/' + userId, { headers: authHeader() });
  }
  // get user info for profile using user id
  getUserProfileById(id) {
    return axios.get(API_URL_Profile + '/getUserProfileById/' + id, { headers: authHeader() });
  }

  // Search by User Name
  searchUser(keyword) {
    return axios.get(API_URL + "/searchUser/" + keyword, {
      headers: authHeader(),
    });
  }

  changeStatus(userId, status) {
    return axios.put(API_URL_Profile + "/changeStatusById/" + userId, null, {
      params: {
        status: status
      },
      headers: authHeader()
    });
  }

  // Update address
  updateAddress(id, userAddress) {
   return axios.put(API_URL_Profile + '/updateAddress/' + id, userAddress, { headers: authHeader() });
  
  }
  //Update user information
  updateUserProfile(id, user) {
    return axios.put(API_URL_Profile + '/updateUser/' + id, user, { headers: authHeader() });
  }

  getUserAddress(id) {
    return axios.get(API_URL_Profile + '/getUserAddress/' + id, { headers: authHeader() });
  }

  updatePassword(userId, passwordData) {
    return axios.put(
      API_URL_Profile + '/updatePassword/' + userId,
      passwordData,
      { headers: authHeader() }
    );
  }
}
export default new UserService();
import axios from 'axios';
import {BehaviorSubject} from 'rxjs';
//make use not to delete this file please

 const API_URL = process.env.REACT_APP_API_SP_URL+'/api/users';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

class UserService {

  get currentUserValue() {
    return currentUserSubject.value;
  }

  get currentUser() {
    return currentUserSubject.asObservable();
  }

  login(username, password) {
    //btoa: Basic64 encryption
    //const headers = {
    //  authorization: 'Basic ' + btoa(user.username + ':' + user.password)
   // };

    return axios.post(API_URL + '/signin', {
      username,
      password})
          .then(response => {
            if(response.data.accessToken){
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            }
            return response.data;
          });
  }

  async logOut() {
     await axios.post(API_URL + "/logout",
      { headers: { "Content-Type": "application/json; charset=UTF-8" } });
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
  }

  register(user) {
    return axios.post(API_URL + '/signup', JSON.stringify(user),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}})  
}

  findAllUsers() {
    return axios.get(API_URL + "/update-user",
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

}

export default new UserService();
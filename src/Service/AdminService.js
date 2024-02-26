import axios from "axios";
import UserService from "./Service";

const API_URL = process.env.REACT_APP_API_SP_URL+"/api/customer/";

class AdminService {
  constructor() {
    UserService.currentUser.subscribe((data) => {
      this.headers = {
        "Content-Type": "application/json",
        authorization: "Bearer " + (data ? data.token : ""),
      };
    });
  }

  updateUser(user) {
    return axios.put(API_URL + "user-update", JSON.stringify(user), {
      headers: this.headers,
    });
  }

  deleteUser(user) {
    return axios.post(API_URL + "user-delete", JSON.stringify(user), {
      headers: this.headers,
    });
  }

  findAllUsers() {
    return axios.get(API_URL + "users-list", { headers: this.headers });
  }


}

export default new AdminService();

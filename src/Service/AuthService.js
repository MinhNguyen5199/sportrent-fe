import axios from "axios";

 const API_URL = process.env.REACT_APP_API_SP_URL+"/api/account";

class AuthService {
  async login(username, password) {
    //btoa: Basic64 encryption
    //const headers = {
    //  authorization: 'Basic ' + btoa(user.username + ':' + user.password)
    // };

    const response = await axios
      .post(API_URL + "/signin", {
        username,
        password,
      });
    if (response.data.accessToken) {
      localStorage.setItem("CurrentUser", JSON.stringify(response.data));
    }
    return response.data;
  }

  async passwordReset(email) {
    const response = await axios.post(API_URL + "/forgotPassword", {
      email,
    });
    return response.data;

  }

  async passwordResetToken(password, token) {
    const response = await axios.post(API_URL + "/forgotPassword/token", {
      password,
      token
    });
    return response.data;

  }

  logout() {
    localStorage.removeItem("CurrentUser");
  }

  register(user) {
    return axios.post(API_URL + "/signup", user);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("CurrentUser"));
  }
}
export default new AuthService();

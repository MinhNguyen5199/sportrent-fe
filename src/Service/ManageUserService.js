import axios from 'axios'

const USER_BASE_REST_API_URL = process.env.REACT_APP_API_SP_URL+'/api/users';
class ManageUserService{

    getUsers(){
        return axios.get(USER_BASE_REST_API_URL+ '/user')
    }

    createUser(user){
        return axios.post(USER_BASE_REST_API_URL + '/signup' + user)
    }

    getUserById(userId){
        return axios.get(USER_BASE_REST_API_URL + '/' + userId);
    }

    updateUser(userId, user){
        return axios.put(USER_BASE_REST_API_URL + '/' + userId, user);
    }

    deleteUser(userId){
        return axios.delete(USER_BASE_REST_API_URL + '/' + userId);
    }

    loginUser(credential){
        return axios.post(USER_BASE_REST_API_URL, credential)
    }
}

export default new ManageUserService();
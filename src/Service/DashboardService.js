import axios from "axios";
import authHeader from "./authHeader";

const API_URL = process.env.REACT_APP_API_SP_URL + "/api/AdminDashboard";

class DashboardService{
    getDashboardData(){
            return axios.get(API_URL + "/dashboard-data",{ headers: authHeader() });
          
    }
}
export default new DashboardService();
import axios from "axios";
import authHeader from "./authHeader";
 const API_URL = process.env.REACT_APP_API_SP_URL+"/api/category";
class CategoryService {
  getCategory() {
    return axios.get(API_URL + "/categories", { headers: authHeader() });
  }

  getCategoryById(categoryId) {
    return axios.get(API_URL + "/categoryById/" + categoryId, {
      headers: authHeader(),
    });
  }
  // Create New category
  createCategory(category) {
    return axios.post(API_URL + "/createCategory", category, {
      headers: authHeader(),"Content-Type": "multipart/form-data",
    });
  }

  //Update category information
  updateCategory(categoryId, category) {
    return axios.put(API_URL + "/categoryUpdate/" + categoryId, category, {
      headers: authHeader(),"Content-Type": "multipart/form-data",
    });
  }
  deleteCategory(categoryId) {
    return axios.delete(API_URL + "/deleteCategory/" + categoryId, {
      headers: authHeader(),
    });
  }

   // Search by Product Name
searchCategory(keyword){ 
  return axios.get(API_URL + "/searchcategory/"+ keyword, {
    headers: authHeader(),
  });
}
}

export default new CategoryService();

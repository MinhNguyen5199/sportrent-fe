import axios from 'axios';

const API_URL_PUBLIC = process.env.REACT_APP_API_SP_URL + '/api/public';
// const API_URL_PUBLIC = "http://localhost:8080/api/public";
class publicService {
  //get public content for all users with out login(Unregistered user, register users, Employee (Moderators), Managers(Admin)

  // Summer Category
  getSummerCategory() {
    return axios.get(API_URL_PUBLIC + '/summerCategory');
  }

  // Winter category
  getWinterCategory() {
    return axios.get(API_URL_PUBLIC + '/winterCategory');
  }

  // get all category
  getCategory() {
    return axios.get(API_URL_PUBLIC + '/category');
  }

  getProduct() {
    return axios.get(API_URL_PUBLIC + '/TopSaleProduct');
  }

  // Get product by category
  getProductByCat(CategoryID) {
    return axios.get(API_URL_PUBLIC + "/getProductByCategoryID/" + CategoryID);
  }

  // Get product and category by season
  getProductBySeason(season) {
    return axios.get(API_URL_PUBLIC + "/ProductBySeason/" + season);
  }

  ProductBySeason
  // Get product by category
  getProductByCategory() {
    return axios.get(API_URL_PUBLIC + "/getProductByCategory");
  }
  // Get product by category
  searchProduct() {
    return axios.get(API_URL_PUBLIC + "/searchProduct");
  }

  getReservationById(reserveId) {
    return axios.get(API_URL_PUBLIC + "/getPickupInfo/" + reserveId);
  }

  getRelatedProductsById(id) {
    return axios.get(API_URL_PUBLIC + "/relatedProductById/" + id);
  }

  getProductWithImages(id) {
    return axios.get(API_URL_PUBLIC + "/imageListById/" + id);
  }

  getCategoryList(){
    return axios.get(API_URL_PUBLIC + '/categoryList');
  }
}

export default new publicService();
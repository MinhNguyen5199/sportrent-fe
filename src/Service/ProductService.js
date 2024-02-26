import axios from "axios";
import authHeader from "./authHeader";
const API_URL = process.env.REACT_APP_API_SP_URL+"/api/product";

class ProductService {
  getProducts() {
    return axios.get(API_URL + "/product", {
       headers: authHeader(),
    });
  }

  getProductById(productId) {
    return axios.get(API_URL + "/productById/" + productId, {
      headers: authHeader(),
    });
  }
  // Create New product
  createProduct(categoryId, product) {
    return axios.post(API_URL + "/createProduct/" + categoryId, product, {
      headers: authHeader(), "Content-Type": "multipart/form-data",
    });
  }

  //Update product information
  updateProduct(productId, product) {
    return axios.put(API_URL + "/productUpdate/" + productId, product, {
      headers: authHeader(), "Content-Type": "multipart/form-data",
    });
  }
  deleteProduct(productId) {
    return axios.delete(API_URL + "/deleteProduct/" + productId, {
      headers: authHeader(),
    });
  }


  // Search by Product Name
searchProduct(keyword){ 
    return axios.get(API_URL + "/searchProduct/"+ keyword, {
      headers: authHeader(),
    });
}

// ProductList by id
getProductList(id){ 
  return axios.get(API_URL + "/productListById/"+ id, {
    headers: authHeader(),
  });
}

findAllProducts() {
  return axios.get(API_URL + "productListById", { headers: this.headers });
}

// Search by Product Name
searchUser(keyword) {
  return axios.get(API_URL + "searchUser/" + keyword, {
    headers: this.headers,
  });
}

getRelatedProductsById(id) {  
  return axios.get(API_URL + "/relatedProductById/" + id, {
    headers: authHeader(),
  });
}

addRelatedProductsToProduct(id, selectedRelatedProducts) {
  return axios.post(API_URL + "/addRelatedProduct/" + id, selectedRelatedProducts, {
    headers: authHeader(), "Content-Type": "multipart/form-data",
  });
}

addProductImages(id, images) {
  return axios.post(API_URL + "/images/" + id, images, {
    headers: authHeader(),
      'Content-Type': 'multipart/form-data',
  });
}

getImagesProductById(id){
return axios.get(API_URL + "/imageListById/"+ id, { headers: authHeader(), });
}

}

export default new ProductService();

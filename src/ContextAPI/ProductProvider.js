// Create a context to manage your data
import { createContext, useContext, useState, useEffect } from 'react';
import ProductService from '../../Service/ProductService';
import { toast } from "react-toastify";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productList, setProductList] = useState([]);

  // Fetch the product list when the context is initialized
  useEffect(() => {
    // Make your API call to get the product list and set it using setProductList
   
   ProductService.getProducts()
      .then((response) => {
        setProductList(response.data);
      })
      .catch((error) => {
        toast.error("Error, Loading Product" + error.message);
      });
     }, []);

  return (
    <ProductContext.Provider value={productList}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductList() {
  return useContext(ProductContext);
}

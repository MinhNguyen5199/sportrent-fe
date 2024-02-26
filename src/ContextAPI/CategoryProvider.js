import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import publicService from '../Service/publicService';

const CategoryContext = createContext();

export default function CategoryProvider({ children }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    // Attempt to retrieve data from localStorage
    const cachedCategoryList = localStorage.getItem('categoryList');

    if (cachedCategoryList) {
      // If cached data exists, set it in the state
      setCategoryList(JSON.parse(cachedCategoryList));
    }

    // Make your API call to get the product list and set it using setCategoryList
    publicService
      .getCategoryList()
      .then((response) => {
        setCategoryList(response.data);
        // Cache the data in localStorage
        localStorage.setItem('categoryList', JSON.stringify(response.data));
      })
      .catch((error) => {
        toast.error('Error, Loading Category' + error.message);
      });
  }, []);

  return (
    <CategoryContext.Provider value={categoryList}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryList() {
  return useContext(CategoryContext);
}

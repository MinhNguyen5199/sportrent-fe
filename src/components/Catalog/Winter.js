import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useCategoryList } from '../../ContextAPI/CategoryProvider';
import './catalog.scss';
import publicService from '../../Service/publicService';
import Loading from '../Product/Loading';

// const LazySeasonCategory = lazy(() => import('./LazySeasonCategory'));
const Category = lazy(() => import("./Category"));

const Winter = () => {
  const categoryList = useCategoryList();
  const [winterCategory, setWinterCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWinterCategory = async () => {
      try {
        if (categoryList && categoryList.length > 0) {
          // Use the cached data and filter for Winter category
          const winterCategories = categoryList.filter(
            (category) => category.season === 'Winter'
          );
          setWinterCategory(winterCategories);
          setIsLoading(false);
        } else {
          // If no cached data, fetch it from the API
          const response = await publicService.getWinterCategory();
          setWinterCategory(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        // Handle errors
        console.error('Error fetching Winter category: ', error);
        setIsLoading(true);
      }
    };

    fetchWinterCategory();
  }, [categoryList]);

  return (
    <section className="wrapper">
      {isLoading ? (
        <Loading />
      ) : (
        <Suspense fallback={<div><Loading /></div>}>
          {/* <LazySeasonCategory category={winterCategory} /> */}
          <Category category={winterCategory} />
        
        </Suspense>
      )}
    </section>
  );
};

export default Winter;

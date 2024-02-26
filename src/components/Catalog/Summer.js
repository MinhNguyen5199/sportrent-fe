import React, { useEffect, useState, lazy, Suspense } from "react";
import { useCategoryList } from "../../ContextAPI/CategoryProvider";
import "./catalog.scss";
import Loading from "../Product/Loading";
import { toast } from "react-toastify";
import publicService from "../../Service/publicService";
// import Category from "./Category";

// Create a lazy-loaded version of the component
const Category = lazy(() => import("./Category"));

const Summer = () => {
  const categoryList = useCategoryList();
  const [summerCategory, setSummerCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      // Use the cached data and filter for Summer category
      const summerCategories = categoryList.filter(
        (category) => category.season === "Summer"
      );
      setSummerCategory(summerCategories);
      setIsLoading(false);
    } else {
      // If no cached data, fetch it from the API
      publicService
        .getSummerCategory()
        .then((response) => {
          setSummerCategory(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          // Handle errors
          toast.error("Error fetching Summer category: " + error.message);
          setIsLoading(true);
        });
    }
  }, [categoryList]);

  return (
    <section className="wrapper">
      {isLoading ? (
        <Loading />
      ) : (
        <Suspense fallback={<div><Loading /></div>}>
          <Category category={summerCategory} />
        </Suspense>
      )}
    </section>
  );
};

export default Summer;

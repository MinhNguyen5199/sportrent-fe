import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../../Service/ProductService";
import PublicService from "../../../Service/publicService";
import { images } from "../../../constants";
// notifier
import { toast } from "react-toastify";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductImageUpload from "./ProductImageUpload";
const ManageProduct = () => {
  const [category_id, setCategory_id] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [product_Name, setProduct_Name] = useState("");
  const [quantity, setQuantity] = useState("");
  const [product_status, setProduct_status] = useState("");
  const [description, setDescription] = useState("");
  const [product_Image, setProduct_Image] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  // category populate
  const [populateCategory, setPopulateCategory] = useState([]);
  // New state to hold selected related product IDs
  const [selectedRelatedProducts, setSelectedRelatedProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const cancel = (e) => {
    navigate("/ManagerLayout/ProductList");
  };
  // Update image preview when a file is chosen
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setProduct_Image(selectedFile);

      // Create a URL for the selected file and set it as the source for the image
      const imageUrl = URL.createObjectURL(selectedFile);
      const imgElement = document.getElementById('img');
      imgElement.src = imageUrl;
    }
  }; 
  //Create or update user account
  const [isDisabled, setDisabled] = useState(false);
  const createOrUpdateProduct = (e) => {
    e.preventDefault();

    setDisabled(true);

    if (!type || !product_Name || !quantity || !price) {
      toast.error("Error, Missing field");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", category_id);
    formData.append("type", type);
    formData.append("product_Name", product_Name);
    formData.append("description", description);
    formData.append("product_status", product_status);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("available_quantity", quantity);
    formData.append("product_Image", product_Image);

    try {
      if (id) {
        ProductService.updateProduct(id, formData)
          .then((response) => {
            navigate("/ManagerLayout/productList");
            toast.success("Product Update Successfully");
          })
          .catch((error) => {
            toast.error("Error, Product create was is not successful" + error);
          });
      } else {
        ProductService.createProduct(category_id, formData)
          .then((response) => {
            navigate("/ManagerLayout/productList");
            toast.success("Product Update Successful");
          })
          .catch((error) => {
            toast.error("Error, Product create was is not successful" + error);
          });
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      ProductService.getProductById(id)
        .then((response) => {
          setProduct_Name(response.data.product_Name);
          setType(response.data.type);
          setQuantity(response.data.quantity);
          setPrice(response.data.price);
          setCategory_id(response.data.category_id);
          setProduct_status(response.data.product_status);
          setDescription(response.data.description);
          setProduct_Image(response.data.product_Image);
        })
        .catch((error) => {
          toast.error("Error, retrieving Product detail" + error);
        })

      getAllRelatedProductByID(id);
    }
  }, [id]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    PublicService.getCategory()
      .then((response) => {
        setPopulateCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllRelatedProductByID = (id) => {
    // Fetch related products by product ID
    ProductService.getRelatedProductsById(id)
      .then((response) => {
        setRelatedProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching related products: ", error);
      });
  }


  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    // Fetch the list of available products from the server
    ProductService.getProducts()
      .then((response) => {
        setAvailableProducts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching available products: ", error);
      });
  }, []);

  // Function to handle adding related products
  const handleAddRelatedProducts = () => {
    ProductService.addRelatedProductsToProduct(id, selectedRelatedProducts)
      .then((response) => {
        toast.success("Related products added successfully to the product.");
        getAllRelatedProductByID(id);
      })
      .catch((error) => {
        toast.error("Error, adding related products: " + error);
      });
  };

  // New state to manage the active tab index
  const [activeTab, setActiveTab] = useState(0);

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const title = () => {
    if (id) {
      return (
        <>
          {/* <h4 className="card-title">Product Information</h4> */}
          <p className="card-title-desc mt-3">Fill all information below</p>
        </>
      );
    } else {
      return (
        <>
          <h4 className="card-title">Product Information</h4>
          <p className="card-title-desc">Fill Field that Require Change below</p>
        </>
      );
    }
  };
  return (
    <div className="container-sm">
      {/* Use the Tabs component to create the tabs */}
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="product tabs">
        <Tab label="Product Information" />
        <Tab label="Related Products" />
        <Tab label="Product Images" />
      </Tabs>

      {/* Render the content based on the active tab */}
      {activeTab === 0 && (
        <div className="product-info">
          <div className="row">
            <div className="col-sm-12 mt-2 mb-2">
              {" "}
              <span className="mb-0"> {title()}</span>
            </div>
          </div>
          <div className="container-sm ">
            <form
              className="needs-validation"
              name="form"
              encType="multipart/form-data"
              onSubmit={createOrUpdateProduct}
            >
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="control-label lblProduct">Category</label>

                    <select
                      className="form-control select2 select2-hidden-accessible"
                      tabindex="-1"
                      aria-hidden="true"
                      value={category_id}
                      onChange={(e) => setCategory_id(e.target.value)}
                    >
                      <option>Open this select menu</option>

                      {populateCategory
                        // .sort((a, b) => a.category_No - b.category_No)
                        .map((categories, index) => (
                          <option key={index} Value={categories.category_id}>
                            {categories.category_No +
                              " " +
                              categories.category_Name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="control-label lblProduct" for="productname ">
                      Product Name
                    </label>
                    <input
                      id="productname"
                      name="productname"
                      type="text"
                      className="form-control"
                      placeholder=" Product Name"
                      value={product_Name}
                      onChange={(e) => setProduct_Name(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="productdesc" className="control-label lblProduct">
                      Product Description
                    </label>
                    <textarea
                      className="form-control"
                      id="productdesc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder=""
                      rows="6"
                      cols="50"
                      required
                      maxLength={254}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label for="type" className="control-label lblProduct">
                      Product type
                    </label>
                    <input
                      id="type"
                      name="type"
                      type="text"
                      className="form-control"
                      placeholder=" Product type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label for="quantity" className="control-label lblProduct">
                      Quantity of Product
                    </label>
                    <input
                      id="quantity"
                      name="quantity"
                      type="text"
                      className="form-control"
                      value={quantity}
                      placeholder=" Quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="price" className="control-label lblProduct">
                      Starting Rental Price
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Product Price"
                    />
                  </div>

                  <div className="form-group">
                    <label className="control-label lblProduct">
                      Product Status
                    </label>

                    <select
                      className="select2 form-control select2-multiple select2-hidden-accessible"
                      multiple=""
                      data-placeholder="Choose ..."
                      data-select2-id="4"
                      tabindex="-1"
                      aria-hidden="true"
                      value={product_status}
                      onChange={(e) => setProduct_status(e.target.value)}
                    >
                      <option>Open this select menu</option>
                      <option defaultValue="Active">Active</option>
                      <option defaultValue="Damage">Damage</option>
                      <option defaultValue="Not Re-turned">Not Re-returned</option>
                    </select>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="control-label lblProduct">
                      Product Image
                    </label>{" "}
                    <br />
                    <img
                      src={`data:image/png;base64,${product_Image}`}
                      alt={images.ImageNotAvailable}
                      onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = images.ImageNotAvailable; // set alternative image
                      }}
                      width={210}
                      height={100}
                      className="img-fluid rounded"
                      id="img"
                    />
                    <br />
                    <label className="control-label lblProduct">
                      Upload Image{" "}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="product_Image"
                      onChange={handleImageChange}
                      id="input"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-success mr-1 waves-effect waves-light"
              >
                submit
              </button>
              <button
                type="submit"
                className="btn btn-secondary waves-effect"
                onClick={(e) => cancel(e)}
              >
                Cancel
              </button>
            </form>
          </div>

        </div>
      )}

      {activeTab === 1 && (
        <div className="related-products">

          {/* related product */}

          <div className="row">
            <div className="col-sm-4 mt-4">
              <div className="form-group">
                <label className="control-label lblProduct">Select Related Product for {product_Name}</label>
                <select
                  className="form-control select2 select2-hidden-accessible relatedProductSelect"
                  multiple
                  value={selectedRelatedProducts}
                  onChange={(e) =>
                    setSelectedRelatedProducts(
                      Array.from(e.target.selectedOptions, (option) =>
                        parseInt(option.value)
                      )
                    )
                  }

                >
                  {availableProducts.map((relatedProduct, index) => (
                    <option key={relatedProduct.id} value={relatedProduct.id}
                      className={`striped-option ${index % 2 === 0 ? 'even-numbered-option' : ''
                        }`}>
                      {relatedProduct.product_Name}
                    </option>
                  ))}
                </select>

              </div>
            </div>
            <div className="col-sm-8">
              <div class="row">
                {relatedProducts.map((relatedProduct, index) => (
                  <div class="col-4 relatedProduct" key={index}>
                    <img
                      src={`data:image/png;base64,${relatedProduct.product_Image}`}
                      alt={images.ImageNotAvailable}
                      onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = images.ImageNotAvailable; // set alternative image
                      }}
                    />
                    <h4>{relatedProduct.product_Name}</h4>
                    <div class="rating">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                    <p>${relatedProduct.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddRelatedProducts}
          >
            Add Related Products
          </button>

          {/* ... existing related products code ... */}
        </div>
      )}

      {activeTab === 2 && (
        <div className="related-products">
        <ProductImageUpload productId={id} />
        </div>
      )}
    </div>
  );
};

export default ManageProduct;


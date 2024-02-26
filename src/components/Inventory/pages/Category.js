import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// notifier
import { toast } from "react-toastify";

import CategoryService from "../../../Service/CategoryService";
import { images } from "../../../constants";

const Category = () => {
  // const [category_Id, setCategory_Id] = useState("");
  const [category_No, setCategory_No] = useState("");
  const [category_Name, setCategory_Name] = useState("");
  const [season, setSeason] = useState("");
  const [category_Image, setCategory_Image] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const cancel = (e) => {
    navigate("/ManagerLayout/categoryList");
  };


  // Update image preview when a file is chosen
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setCategory_Image(selectedFile);

      // Create a URL for the selected file and set it as the source for the image
      const imageUrl = URL.createObjectURL(selectedFile);
      const imgElement = document.getElementById('img');
      imgElement.src = imageUrl;
    }
  };

  //Create or update user account
  const [isDisabled, setDisabled] = useState(false);
  const createOrUpdateCategory = (e) => {
    e.preventDefault();

    if(!category_Name || !category_No){
      toast.error("Error, Please enter Category Name & No");
      return;
    }
   
    setDisabled(true);
    
    const formData = new FormData();
    formData.append('category_No', category_No);
    formData.append('category_Name', category_Name);
    formData.append('season', season);
    formData.append('category_Image', category_Image);

    // const json = {};
    // Array.from(formData.entries()).forEach(([key, value]) => {
    //   json[key] = value;
    // })
    
    // console.log(JSON.stringify(json));
    
    // new Response(formData).JSON.stringify().then(console.log)

    if (id) {
      CategoryService.updateCategory(id, formData)
        .then((response) => {
          toast.success("Category Updated Successfully");
          navigate("/ManagerLayout/categoryList");
        })
        .catch((error) => {
          toast.error("Error, Category create was is not successful"+ error);
        });
    } else {
      CategoryService.createCategory(formData)
        .then((response) => {
          toast.success("Category Created Successfully");
          navigate("/ManagerLayout/categoryList");
        })
        .catch((error) => {
          toast.error("Error, Category create was is not successful"+ error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      CategoryService.getCategoryById(id)
        .then((response) => {
          // setCategory_Id(response.data.category_Id);
          setCategory_No(response.data.category_No);
          setCategory_Name(response.data.category_Name);
          setSeason(response.data.season);
          setCategory_Image(response.data.category_Image);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);


  const title = () => {
    if (id) {
      return (
       <>
        <h4 className="card-title">Category Information</h4>
        <p className="card-title-desc">Fill all information below</p>
        
        </>
      );
    } else {
      return (
        <>
        <h4 className="card-title">Product Information</h4>
        <p className="card-title-desc">Fill Field that Require Change below</p>
       
        </>);
    }
  };
  return (
    <div classNAme="container-sm">
      <div className="row-md-12">
        <div className="col-sm-12 mt-5 mb-2">
          <p className="mb-3"> {title()}</p>
        </div>
      </div>
      <div className="container">
        <form className="needs-validation" name="form">
          <div className="row">
            <div className="col-md-5 mb-3">
              <div className="row-md-12">
                <div className="col-md-12 mb-3">
                  <label htmlFor="cat">Category Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" Product Type"
                    name="category_No"
                    value={category_No}
                    onChange={(e) => setCategory_No(e.target.value)}
                    required
                  />

                  <div className="invalid-feedback">
                    Valid Category Code is required.
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="type">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                    name="category_Name"
                    value={category_Name}
                    onChange={(e) => setCategory_Name(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">
                    Valid Category Name is required.
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="season">Rental Season</label>
                 
                  <div className="input-group">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                >
                  <option selected>Open this select menu</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="Sales">Sales</option>
                  <option value="All Season">All Season</option>
                 </select>
               
                  <div className="invalid-feedback">
                    Valid Rental Season is required.
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div className="col-md-6 mb-3 ml-5">
              <div></div>
              <div className="form-group files color">
                <img
                   src={`data:image/png;base64,${category_Image}`} 
                  className=" p-2 bg-white"
                  width={300}
                  alt={images.ImageNotAvailable}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = images.ImageNotAvailable;
                      }}
                  height={300}
                  id="img"
                />{" "}<br/>
                <label>Upload Your File </label>
                <input
                  type="file"
                  className="form-control"
                  name="file"
                 onChange={handleImageChange}
                 id="input"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3 mb-2 mr-5">
              <button
                className="btn btn-secondary btn-md btn-block"
                type="submit"
                onClick={(e) => cancel(e)}
              >
                Cancel
              </button>
            </div>
            <div className="col-md-3 mb-2">
              <button
                className="btn btn-primary btn-md btn-block"
                type="submit"
                onClick={(e) => createOrUpdateCategory(e)}
                disabled={isDisabled}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Category;

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ProductService from '../../../Service/ProductService';

const ProductImageUpload = ({ productId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    // Fetch the product data including the images from the server
    ProductService.getImagesProductById(productId)
      .then((response) => {
        setProductImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product images', error);
      });
  }, [productId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('images', selectedFile);

      ProductService.addProductImages(productId, formData)
        .then((response) => {
          toast.success('Image uploaded successfully');
        })
        .catch((error) => {
          toast.error('Error uploading image', error);
        });
    }
  };

  return (
    <>
    <div className="form-group">
      <label className="control-label lblProduct">Upload Image</label>
      <input type="file" className="form-control" onChange={handleFileChange} />
      <button className="btn btn-success mr-1 waves-effect waves-light" onClick={handleUpload}>
        Upload
      </button>
    </div>

    <div>
      {productImages.length > 0 ? (
        <div>
          <h2>Product Images</h2>
          <div>
            {productImages.map((image, index) => (
              <img
                key={index}
                src={`data:image/jpeg;base64,${image.imageData}`} // Assuming imageData is base64 encoded
                alt={`Product Image ${index}`}
                style={{ width: '200px', height: '200px', margin: '10px' }}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>No images found for this product.</p>
      )}
    </div>
    </>
  );
};

export default ProductImageUpload;

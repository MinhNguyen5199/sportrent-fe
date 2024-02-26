import React, { useEffect, useState } from "react";

import Create from "@mui/icons-material/Add";
import Export from "@mui/icons-material/FileDownload";
import ProductService from "../../../../Service/ProductService";

import { CSVLink } from "react-csv";

import { TablePagination, TableRow, TableFooter, Button } from "@mui/material";
// notifier
import { toast } from "react-toastify";
import { images } from "../../../../constants";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // populate all products to the table
  const getProducts = () => {
    ProductService.getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        toast.error("Error, Loading Product" + error.message);
      });
  };

  // delete product one at time by it product id
  const deleteProduct = (productId) => {
    ProductService.deleteProduct(productId)
      .then((response) => {
        getProducts();
        toast.success("Product Deleted Successfully");
      })
      .catch((error) => {
        toast.error("Error, Product Deleting was not successful" + error);
      });
  };
  // Search Product using it product name
  const { searchTerm } = useState([]);

  const searchProduct = (keyword) => {
    // show all product if the search term is empty other wise based on the search term
    if (keyword === "") {
      getProducts();
    } else {
      ProductService.searchProduct(keyword)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          toast.error("Error, during category search" + error);
        });
    }
  };

  // table pagination
  const [page, setPage] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // ProductList
  const [productLists, setProductLists] = useState([]);
  const getProductList = (productListId) => {
    ProductService.getProductList(productListId)
      .then((response) => {
        setProductLists(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductList();
  }, []);

  //Instanciate CSV HEADERS
  const headers = [
    { label: "ID", key: "id" },
    { label: "Product Name", key: "product_Name" },
    { label: "Category", key: "category.category_Name" },
    { label: "Type", key: "type" },
    { label: "Price", key: "price" },
    { label: "Quantity", key: "quantity" },
    { label: "Status", key: "product_status" },
    { label: "Description", key: "description" },
  ];
  return (
    <>
      <div className="container-sm p-0">
        <div className="table-responsive m-0">
          <div className="table-wrapper p-0">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-12">
                  <h2>
                    Rental Product <b>Details</b>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8">
                <Button
                  className="me-2"
                  variant="outlined"
                  startIcon={<Create />}
                >
                  <a href={`/ManagerLayout/product`}> Create </a>
                </Button>
                <CSVLink
                  data={products}
                  headers={headers}
                  filename={"sr-products.csv"}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="outlined" startIcon={<Export />}>
                    Export
                  </Button>
                </CSVLink>
              </div>

              <div className="col-sm-4">
                <div className="search-box">
                  <i className="material-icons">&#xE8B6;</i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search&hellip;"
                    value={searchTerm}
                    onChange={(e) => searchProduct(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="table-responsive p-2">
              <table className="table table-striped table-hover table-bordered ">
                <thead>
                  <tr classNameName="align-center">
                    <th scope="col">#</th>
                    <th>No</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Price</th>

                    <th>Status</th>
                    <th>Description</th>
                    <th style={{ width: "95px" }}>Stock</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(rowsPerPage > 0
                    ? products.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    : products
                  ).map((product, index) => (
                    <>
                      <tr
                        key={product.id}
                        className="accordion-toggle collapsed"
                        id="accordion1"
                        data-toggle="collapse"
                        data-parent="#accordion1"
                        href={"#collapse" + index}
                      >
                        <td
                          className="expand-button"
                          onClick={() => getProductList(product.id)}
                        ></td>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {" "}
                          <img
                            src={`data:image/png;base64,${product.product_Image}`}
                            alt={images.ImageNotAvailable}
                            className="img-fluid prod_Image"
                            onError={(e) => {
                              e.target.onerror = null; // prevent infinite loop
                              e.target.src = images.ImageNotAvailable; // set alternative image
                            }}
                          />
                        </td>
                        <td>{product.product_Name}</td>
                        <td>{product.category.category_Name}</td>
                        <td>{product.type}</td>
                        <td>{product.price}</td>

                        <td>{product.product_status}</td>
                        <td>{product.description}</td>
                        <td>
                          <div className="progress" style={{ height: "5px" }}>
                            <div
                              className={`progress-bar ${product.available_quantity === 0
                                ? "bg-danger"
                                : (product.available_quantity / product.quantity) * 100 <= 20
                                  ? "bg-danger"
                                  : (product.available_quantity / product.quantity) * 100 <= 60
                                    ? "bg-warning"
                                    :
                                    (product.available_quantity / product.quantity) * 100 <= 100
                                      ? "bg-success"
                                      : ""
                                }`}
                              role="progressbar"
                              style={{
                                width:
                                  product.available_quantity === 0
                                    ? "100%"
                                    : `${(product.available_quantity / product.quantity) * 100}%`,
                              }}
                              aria-valuenow={product.available_quantity}
                              aria-valuemin="0"
                              aria-valuemax={product.quantity}
                              title={
                                product.available_quantity === 0
                                  ? "0%"
                                  : `${((product.available_quantity / product.quantity) * 100).toFixed(0)}%  - Avail. ${(product.available_quantity )} of ${(product.quantity )}`
                              } // Display quantity and available quantity as a tooltip
                            ></div>
                          </div>


                        </td>
                        <td className="text-right">
                          {/* <a href="/" className="view" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></a> */}
                          <a
                            href={`/ManagerLayout/product/${product.id}`}
                            className="me-2"
                            title="Edit"
                            data-toggle="tooltip"
                          >
                          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ffcc33" d="M7.243 17.996H3v-4.242L14.435 2.319a1 1 0 0 1 1.414 0l2.829 2.828a1 1 0 0 1 0 1.414L7.243 17.996Zm-4.243 2h18v2H3v-2Z"/>
</svg>
                            {/* <i className="material-icons">&#xE254;</i> */}
                          </a>
                          <Link
                            href="#"
                            className="ml-2"
                            title="Delete"
                            data-toggle="tooltip"
                            onClick={() => {
                              window.confirm(
                                "Are you sure you want to delete this Item ?"
                              ) && deleteProduct(product.id);
                            }}
                          >
                          <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ff0000" d="M9 17h2V8H9v9Zm4 0h2V8h-2v9Zm-8 4V6H4V4h5V3h6v1h5v2h-1v15H5Z"/>
</svg>
                            {/* <i className="material-icons">&#xE872;</i> */}
                          </Link>
                        </td>
                      </tr>

                      {/* collapse and expand Product list  */}
                      {productLists.map((productList, ind) => (
                        <tr
                          className="hide-table-padding collapse in p-3"
                          id={"collapse" + index}
                        >
                          <td colSpan="3"></td>

                          <th scope="row">{ind + 1}</th>
                          <td>{productList.product_status}</td>
                          <td colSpan="3">{productList.serial_Number}</td>
                          <td>{productList.prod_Description}</td>
                          <td>action</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={products.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPageOptions={[5, 10, 25]}
                      labelRowsPerPage={<span>Rows:</span>}
                      labelDisplayedRows={({ page }) => {
                        return `Page: ${page}`;
                      }}
                      backIconButtonProps={{
                        color: "primary",
                      }}
                      nextIconButtonProps={{ color: "primary" }}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "page number",
                        },
                      }}
                      showFirstButton={true}
                      showLastButton={true}
                    />
                  </TableRow>
                </TableFooter>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductList;

import React, { useEffect, useState } from "react";
import Create from "@mui/icons-material/Add";
import Export from "@mui/icons-material/FileDownload";
import { TablePagination, TableRow, TableFooter, Button } from '@mui/material';
import { CSVLink } from "react-csv";
import { images } from "../../../../constants";

// notifier
import { toast } from "react-toastify";

import categoryService from "../../../../Service/CategoryService";
const CategoryList = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);
  // get all category
  const getCategory = () => {
    categoryService
      .getCategory()
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        toast.error("Error, Loading Category" + error);
      });
  };
  // Delete selected category
  const deleteCategory = (category_id) => {
    categoryService
      .deleteCategory(category_id)
      .then((response) => {
        getCategory();
        toast.success("Category Deleted Successfully");
      })
      .catch((error) => {
        toast.error("Error, Category Deleting was is not successful" + error);
      });
  };
  // Search by Keyword
  const { searchTerm } = useState([]);
  // display all category if the search team is empty other wise display based on the search term

  const searchCategory = (keyword) => {
    if (keyword === "") {
      getCategory()
    } else {
      categoryService.searchCategory(keyword)
        .then((response) => {
          setCategory(response.data);
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


  //Instanciate CSV HEADERS
  const headers = [
    { label: "ID", key: "id" },
    { label: "Category No", key: "category_No" },
    { label: "Category", key: "category_Name" },
    { label: "Season", key: "season" },
  ];
  return (
    <div className="container-xl p-0">
      <div className="table-responsive m-0">
        <div className="table-wrapper p-0">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-12">
                <h2>
                  Category <b>Details</b>
                </h2>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-8 p-0">
              <Button
                className="me-2"
                variant="outlined"
                startIcon={<Create />}
              >
                <a href={`/ManagerLayout/category`}>Create </a>
              </Button>
              <CSVLink
                data={category}
                headers={headers}
                filename={"sr-Category.csv"}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined" startIcon={<Export />}>
                  Export
                </Button>
              </CSVLink>
            </div>
            <div className="col-sm-4 p-0">
              <div className="search-box">
                <i className="material-icons">&#xE8B6;</i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search&hellip;"
                  value={searchTerm}
                  onChange={(e) => searchCategory(e.target.value)}
                />
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr className="align-center">
                <th scope="col">#</th>
                <th>Image</th>
                <th>Category Code</th>
                <th>Category Name</th>
                <th>Rental Season</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(rowsPerPage > 0 ? category.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : category)
                .map((cat, index) => (
                  <tr key={cat.category_id}>
                    <th scope="row">{index + 1}</th>
                    <td> <img
                      src={`data:image/png;base64,${cat.category_Image}`}
                      alt={images.ImageNotAvailable}
                      className="img-fluid prod_Image"
                      onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = images.ImageNotAvailable; // set alternative image
                      }}
                    /></td>
                    <td>{cat.category_No}</td>
                    <td>{cat.category_Name}</td>
                    <td>{cat.season}</td>
                    <td>
                      {/* <a href="/" className="view" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></a> */}
                      <a
                        href={`/ManagerLayout/category/${cat.category_id}`}
                        className="edit"
                        title="Edit"
                        data-toggle="tooltip"
                      >
                        <i className="material-icons">&#xE254;</i>
                      </a>
                      <a
                        href="#"
                        className="delete"
                        title="Delete"
                        data-toggle="tooltip"
                        onClick={() => {
                          window.confirm(
                            "Are you sure you want to delete this Category ?"
                          ) && deleteCategory(cat.category_id);
                        }}
                      >
                        <i className="material-icons">&#xE872;</i>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  count={category.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, { value: -1, label: 'All' }]}
                  labelRowsPerPage={<span>Rows:</span>}
                  labelDisplayedRows={({ page }) => {
                    return `Page: ${page}`;
                  }}
                  backIconButtonProps={{
                    color: "primary"
                  }}
                  nextIconButtonProps={{ color: "primary" }}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "page number"
                    }
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
  );
};

export default CategoryList;

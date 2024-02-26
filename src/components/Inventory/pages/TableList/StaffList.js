import React, { useEffect, useState } from "react";
import UserService from "../../../../Service/UserService";
import { TablePagination,TableRow,TableFooter ,Button} from '@mui/material';
import Create from "@mui/icons-material/Add";
import Export from "@mui/icons-material/FileDownload";
import { CSVLink } from "react-csv";
// notifier
import { toast } from "react-toastify";



const StaffList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  },[]);

  const getUsers = () => {
    UserService.getUsers()
      .then((response) => {
        const staffUsers = response.data.filter((user) => {
          return user.roles.some(
            (role) =>
              role.name === "ROLE_MODERATOR" || role.name === "ROLE_ADMIN"
          );
        });
        setUsers(staffUsers);
       
      })
      .catch((error) => {
        toast.error("Error loading users: " + error);
      });
  };
  

  const deleteUser = (userId) => {
    UserService.deleteUser(userId)
      .then((response) => {
        getUsers();
      })
      .catch((error) => {
        toast.error("Error, User Deleting was is not successful"+ error);
      });
  };

  // Search Customer by keyword
  const {searchTerm } = useState([]);
  const searchUser = (keyword) => { 
    UserService.searchUser(keyword)
      .then((response) => {
        setUsers(response.data);
       
      })
      .catch((error) => {
        toast.error("Error, during Users search"+ error);
      });
  };

  
  // table pagination
const [page, setPage] = useState(0);
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
    { label: "First Name", key: "firstName" },
    { label: "LastName", key: "lastName" },
    { label: "email", key: "email" },
    { label: "User Name", key: "username" },
  ];
  return (
    <div className="container-xl p-0">
      <div className="table-responsive m-0">
        <div className="table-wrapper p-0">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-12">
                <h2>
                  Staff Account <b>Details</b>
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
            <a href={`/ManagerLayout/staff`}> Create </a>
              </Button>
              <CSVLink
        data={users}
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
                  onChange={(e) => searchUser(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="table-responsive p-2">
              <table className="table table-striped table-hover table-bordered ">
           
            <thead>
              <tr>
                <th scope="col">#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Status</th>
                <th>Roles</th>
              </tr>
            </thead>
            <tbody>
            {(rowsPerPage > 0? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage):users)
            .map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.status}</td>
                  <td> {user.roles.map((role) => role.name).join(", ")}</td>
                  <td>
                    {/* <a href="/" className="view" title="View" data-toggle="tooltip"><i className="material-icons">&#xE417;</i></a> */}
                    <a
                      href={`/ManagerLayout/staff/${user.id}`}
                      className="edit"
                      title="Edit"
                      data-toggle="tooltip"
                    >
                      <i className="material-icons">&#xE254;</i>
                    </a>
                    <a
                      href="/ManagerLayout/StaffList"
                      className="delete"
                      title="Delete"
                      data-toggle="tooltip"
                      onClick={() => {
                        window.confirm(
                          "Are you sure you want to delete this User?"
                        ) && deleteUser(user.id);
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
        count={users.length}
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
    </div>
  );
};
//}

export default StaffList;


import React ,{useEffect, useState}from 'react'
// import { Visibility } from "@material-ui/icons";
import UserService from "../../../Service/UserService";

// notifier
import { toast } from "react-toastify";

const NewMembers =() => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  // display all users
  const getUsers = () => {
    UserService.getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error("Error, Loading Users"+ error);
      });
  };
  return (
    <div className="memberSm">
     <p className="chartTitle">New Join Members</p>
      <ul className="memberSmList">
       
      {users.slice(0, 5).map((user, index) => (
        <li className="memberSmListItem">
         <div className="memberSmIcon">
          <img
           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
             alt=""
            className="memberSmImg"
          />
          </div>
          <div className="row memberSmUser">
            <span className="memberSmUsername">{user.firstName + " " + user.lastName} </span>
            <span className="memberSmUserTitle">{user.status}</span>
          </div>
          <button className="memberSmButton">
            {/* <Visibility className="memberSmIcon" /> */}
            Display
          </button>
        </li>
      ))}
      </ul>
    </div>
  );
}
export default NewMembers;
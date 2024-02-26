import React from 'react';
import { Link } from 'react-router-dom';

export const EmployeeProfile = ({ employeeProfile }) => {
  // Check if employeeProfile is defined and is an array
  if (!employeeProfile || !Array.isArray(employeeProfile)) {
    return <div>Employee data is Loading</div>;
  }

  // Filter users whose roles are different from "ROLE_USER"
  const filteredUsers = employeeProfile.filter((user) => !user.roles.some((role) => role.name === 'ROLE_USER'));

  // Map roles to display names
  const mapRoleToDisplayName = (roleName) => {
    switch (roleName) {
      case 'ROLE_MODERATOR':
        return 'Sales Associate';
      case 'ROLE_ADMIN':
        return 'Manager';
      default:
        return roleName;
    }
  };

  // Extract names and roles from filtered users with display names
  const userNamesAndRoles = filteredUsers.map((user) => ({
    id: user.id,
    name: `${user.username} `,
    role: user.roles.map((role) => mapRoleToDisplayName(role.name)).join(', '), // Map role name to display name
  }));

  return (
    <div className="row">
      {userNamesAndRoles.map((employee, index) => (
        <div className="col-lg-3 col-sm-6" key={index}>
          <Link to={`/ManagerLayout/staff/${employee.id}`}>
            <div className="card employeeCard">
              <div className="card-body">
                <div className="text-center">
                  <img src="https://images.gr-assets.com/authors/1561336084p8/4123863.jpg" className="rounded-circle" alt="" />
                  <h5 className="mt-3 mb-1 employeeName">{employee.name}</h5>
                  <p className="m-0 employeeTitle">{employee.role}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EmployeeProfile;

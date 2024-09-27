import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../features/users/usersThunk";
// import { filterUsersByStatus, searchUserByName } from "../../features/users/usersSlice";
import TableComponent from "../components/Table/Table";
// import {
//   filterUsersByStatus,
//   searchUserByName,
// } from "../../features/users/usersSlice";

const Users = () => {
  const dispatch = useDispatch();

  //? Obtenemos los datos y el estado del slice de users
  const { users, filteredUsers, status, error } = useSelector(
    (state) => state.users
  );

  // const [searchText, setSearchText] = useState("");
  // const [currentPageIndex, setCurrentPageIndex] = useState("");

  //? Dispatch para cargar los datos al montar el componente
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
   
  }, [dispatch, status]);

  // const handleSearchChange = (e) => {
  //   setSearchText(e.target.value);
  //   dispatch(searchUserByName(e.target.value));
  // };

  // const handleStatusFilter = (status) => {
  //   setCurrentPageIndex("");
  //   dispatch(filterUsersByStatus(status));
  // };

  // const handleSortChange = (column) => {
  //   dispatch(sortUsersByColumn({ column, direction: "asc" }));
  // };

  // const selectors = [
  //   { label: "All Employees", value: "All" },
  //   { label: "Active Employees", value: "Active" },
  //   { label: "Inactive Employees", value: "Inactive" },
  // ];

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Job Description", accessor: "jobDescription" },
    { header: "Contact", accessor: "contact" },
    { header: "Status", accessor: "status" },
  ];

  const renderCellContent = (user, column) => {
    console.log(user);
    switch (column) {
      case "name":
        return (
          <div>
            <img
              src={user.picture}
              alt={user.name}
              style={{ width: "3em", borderRadius: "50%" }}
            />
            <div>
              #{user.id} -{user.name}
              Joined on {user.joined}
            </div>
          </div>
        );
      case "jobDescription":
        return user.jobDescription;
      case "contact":
        return user.contact;
      case "status":
        return (
          <span style={{ color: user.status === "Active" ? "green" : "red" }}>
            {user.status}
          </span>
        );
      default:
        return null;
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
  console.log("Users data:", users);

  return (
    <div>
      <h1>Users</h1>
      {/* <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search by name"
      /> */}
      
      {/* <div>
        {selectors.map((selector) => (
          <button
            key={selector.value}
            onClick={() => handleStatusFilter(selector.value)}
            style={{ margin: "0 5px" }}
          >
            {selector.label}
          </button>
        ))}
      </div> */}

      {/* Table */}
      <TableComponent
        columns={columns}
        // data={filteredUsers}
        data={users}
        renderCellContent={renderCellContent}
        // selectors={selectors}
        // currentPageIndex={currentPageIndex}
        // onFilterChange={handleStatusFilter}
        // defaultSortColumn={users.joined}
        // defaultSortDirection="asc"
      />
    </div>
  );
};

export default Users;

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableComponent from "../components/Table/Table";
import {
  filterUsersByStatus,
  searchUserByName,
  sortUsersByColumn,
} from "../../features/users/usersSlice";
import { fetchUsers } from "../../features/users/usersThunk";

const Users = () => {
  const dispatch = useDispatch();

  //? Obtenemos los datos y el estado del slice de users
  const users = useSelector((state) => state.users.users);
  const filteredUsers = useSelector((state) => state.users.filteredUsers);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  const [searchText, setSearchText] = useState("");
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  //? Dispatch para cargar los datos al montar el componente
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  // const handleFilterChange = (newFilter) => {
  //   setCurrentFilter(newFilter);
  // };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    dispatch(searchUserByName(e.target.value));
  };

  const handleStatusFilter = (status) => {
    setCurrentPageIndex(1);
    dispatch(filterUsersByStatus(status));
  };

  // const handleSortChange = (column) => {
  //   dispatch(sortUsersByColumn({ column, direction: "asc" }));
  // };

  const selectors = [
    { label: "All Employees", value: "All" },
    { label: "Active Employees", value: "Active" },
    { label: "Inactive Employees", value: "Inactive" },
  ];

  const columns = ["Name", "Job Description", "Contact", "Status"];

  const renderCellContent = (user, column) => {
    switch (column) {
      case "Name":
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
      case "Job Description":
        return user.jobDescription;
      case "Contact":
        return user.contact;
      case "Status":
        return (
          <span style={{ color: user.status === "Active" ? "green" : "red" }}>
            {user.status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search by name"
      />
      {/* 
      
      <div>
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
        selectors={selectors}
        data={filteredUsers}
        // data={users}
        currentPageIndex={currentPageIndex}
        columns={columns}
        onFilterChange={handleStatusFilter}
        // currentFilter={currentFilter}
        renderCellContent={renderCellContent}
        defaultSortColumn={users.joined}
        defaultSortDirection="asc"
      />
    </div>
  );
};

export default Users;

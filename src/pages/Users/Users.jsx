import { useState } from "react";
import TableComponent from "../components/Table/Table";

const Users = () => {
  const [currentPage, setCurrentPage] = useState("users");
  return (
    <div>
      <h1>Users/Users</h1>

      <TableComponent currentPage={currentPage} />
    </div>
  );
};

export default Users;
import { useState } from "react";
import TableComponent from "../components/Table/Table";

const Concierge = () => {
  const [currentPage, setCurrentPage] = useState("users");
  return (
    <div>
      <h1>Concierge/Users</h1>

      <TableComponent currentPage={currentPage} />
    </div>
  );
};

export default Concierge;
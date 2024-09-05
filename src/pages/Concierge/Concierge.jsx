import { useState } from "react";
import TableComponent from "../Concierge/Concierge";

const Concierge = () => {
  const [currentPage, setCurrentPage] = useState("concierge");
  return (
    <div>
      <h1>Concierge/Users</h1>

      <TableComponent currentPage={currentPage} />
    </div>
  );
};

export default Concierge;
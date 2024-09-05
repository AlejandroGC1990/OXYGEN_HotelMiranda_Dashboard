import { useState } from "react";
import TableComponent from "../components/Table/Table";

const Bookings = () => {
  const [currentPage, setCurrentPage] = useState("booking");
  return (
    <div>
      <h1>Bookings</h1>

      <TableComponent currentPage={currentPage} />
    </div>
  );
};

export default Bookings;

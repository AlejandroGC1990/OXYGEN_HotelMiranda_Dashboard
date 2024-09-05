import { useState } from "react";
import TableComponent from "../components/Table/Table";

const Rooms = () => {
  const [currentPage, setCurrentPage] = useState("room");
  return (
    <div>
      <h1>Room</h1>

      <TableComponent currentPage={currentPage} />
    </div>
  );
};

export default Rooms;
import { useParams } from "react-router-dom";
import TableComponent from "../components/Table/Table";
import { useState } from "react";

const Contact = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const {id} = useParams();
  
  return (
    <>
      <h1>Contact</h1>
      <p>{id ? `ID: ${id}` : "Get All"}</p>
      <TableComponent currentPage={currentPage} />
    </>
  );
};

export default Contact;

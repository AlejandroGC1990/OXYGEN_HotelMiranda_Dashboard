import { useState, useMemo } from "react";
import data from "../../../data/falseData_contact.json";
import styled from "styled-components";
import PropTypes from "prop-types";
import "./__table.scss";

const TableWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f5f5f5;

  th {
    padding: 10px;
    border-bottom: 2px solid #ddd;
    text-align: left;
  }
`;

const TableBody = styled.tbody`
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 3px;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
  }
`;

const ITEMS_PER_PAGE = 10;

const TableComponent = ({ currentPage }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const filteredData = useMemo(() => {
    return data;
  }, []);

  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filteredData]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPageIndex - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedData.slice(start, end);
  }, [currentPageIndex, sortedData]);

  const columnsForDashboard = [
    "Order Id",
    "Date",
    "Customer",
    "Comment",
    "Action",
  ];
  const columnsForBooking = [
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Special Request",
    "Room Type",
    "Status",
  ];
  const columnsForRoom = [
    "Room Name",
    "Bed Type",
    "Room Floor",
    "Amenities ",
    "Price",
    "Status",
    "Offer Price",
  ];
  const columnsForConcierge = [
    "Name",
    "Job Desk",
    "Schedule",
    "Contact",
    "Status",
  ];

  const renderCellContent = (item, key) => {
    switch (currentPage) {
      case "dashboard":
        if (key === "Order Id") {
          return <span>{item.id_review}</span>;
        } else if (key === "Customer") {
          return (
            <div>
              <span>{item.name}</span>
              <span>{item.email}</span>
              <span>{item.phone}</span>
            </div>
          );
        } else if (key === "Comment") {
          return (
            <div>
              {item.pounts}
              <br />
              {item.comment}
            </div>
          );
        } else if (key === "Action") {
          return <button>Archive</button>;
        } else {
          return item[key.toLowerCase().replace(/ /g, "_")];
        }
      case "booking":
        if (key === "Guest") {
          return (
            <div>
              <span>{item.name}</span>
              <span>{item.booking_id}</span>
            </div>
          );
        } else if (key === "Special Request") {
          return <button>Open Request</button>;
        } else if (key === "Status") {
          const statusColors = {
            "Check In": "green",
            "Check Out": "red",
            "In Progress": "yellow",
          };
          return (
            <span
              style={{ color: statusColors[item.statusBooking] || "black" }}
            >
              {item.statusBooking}
            </span>
          );
        } else {
          return item[key.toLowerCase().replace(/ /g, "_")];
        }
      case "room":
        if (key === "Room Name") {
          return (
            <div>
              <img src={item.room_photo} alt={item.room_number} />
              <span>{item.room_number}</span>
            </div>
          );
        } else if (key === "Offer Price") {
          const discount = item.price * 0.8; // 20% de descuento por ejemplo
          return `$${discount.toFixed(2)}`;
        } else if (key === "Status") {
          return item.room_status === "Available" ? "Available" : "Booked";
        } else {
          return item[key.toLowerCase().replace(/ /g, "_")];
        }
      case "concierge":
        return item[key.toLowerCase().replace(/ /g, "_")];
      default:
        return null;
    }
  };

  const columns =
    currentPage === "dashboard"
      ? columnsForDashboard
      : currentPage === "booking"
      ? columnsForBooking
      : currentPage === "room"
      ? columnsForRoom
      : currentPage === "concierge"
      ? columnsForConcierge
      : [];

  const handleNextPage = () => {
    if (currentPageIndex < totalPages) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 1) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <TableWrapper>
      <StyledTable>
        <TableHeader>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </TableHeader>

        <TableBody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col}>{renderCellContent(item, col)}</td>
              ))}
            </tr>
          ))}
        </TableBody>
      </StyledTable>

      {/* Pagination Controls */}
      <Pagination>
        <button onClick={handlePreviousPage} disabled={currentPageIndex === 1}>
          Previous
        </button>
        <span>
          Page {currentPageIndex} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPageIndex === totalPages}
        >
          Next
        </button>
      </Pagination>
    </TableWrapper>
  );
};

TableComponent.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

export default TableComponent;

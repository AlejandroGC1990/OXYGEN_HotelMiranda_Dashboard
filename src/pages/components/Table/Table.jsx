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

const SelectorWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;

const SearchInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const ITEMS_PER_PAGE = 10;

const TableComponent = ({ currentPage }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1); //?Almacena el íncide de la página actual de la tabla.
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  //?
  const filteredData = useMemo(() => {
    let filtered = data;

    if (currentPage === "contact") {
      if (filter === "Published") {
        filtered = data.filter((item) => item.status === "published");
      } else if (filter === "Archived") {
        filtered = data.filter((item) => item.status === "archived");
      }
    } else if (currentPage === "room") {
      if (filter === "Available Rooms") {
        filtered = data.filter((item) => item.room_status === "available");
      } else if (filter === "Occupied Rooms") {
        filtered = data.filter((item) => item.room_status !== "available");
      } else if (filter === "Price") {
        filtered = [...data].sort((a, b) => a.price - b.price);
      }
    } else if (currentPage === "booking") {
      if (filter === "Check In") {
        filtered = [...data].sort(
          (a, b) => new Date(b.check_in) - new Date(a.check_in)
        );
      } else if (filter === "Check Out") {
        filtered = [...data].sort(
          (a, b) => new Date(b.check_out) - new Date(a.check_out)
        );
      } else if (filter === "In Progress") {
        filtered = data.filter((item) => item.statusBooking === "In Progress");
      }
    } else if (currentPage === "users") {
      if (filter === "Active Employee") {
        filtered = data.filter((item) => item.status === "active");
      } else if (filter === "Inactive Employee") {
        filtered = data.filter((item) => item.status === "inactive");
      }

      if (searchTerm) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }

    return filtered;
  }, [filter, searchTerm, currentPage]);

  //? Ordena los datos por fecha descendiente
  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [filteredData]);

  //?  Calcula el número total de páginas dividiendo la longitud de los datos por ITEMS_PER_PAGE
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  //?  selecciona los datos para mostrar en la página actual con slice
  //?(paginar es tomar un subconjunto de los datos totales).
  const paginatedData = useMemo(() => {
    const start = (currentPageIndex - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedData.slice(start, end);
  }, [currentPageIndex, sortedData]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPageIndex(1); //Resetea la paginación cuando filtra los cambios
  };

  //? Columnas de la tabla para cada una de las páginas:
  const columnsForContact = [
    "Order Id",
    "Date",
    "Customer",
    "Comment",
    "Action",
  ];
  const columnsForBooking = [
    "Contact",
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
  const columnsForUsers = ["Name", "Job Desk", "Schedule", "Contact", "Status"];

  //? Selecciona las columnas correctas según la página (currentPage) que se esté mostrando.
  const columns =
    currentPage === "contact"
      ? columnsForContact
      : currentPage === "booking"
      ? columnsForBooking
      : currentPage === "room"
      ? columnsForRoom
      : currentPage === "users"
      ? columnsForUsers
      : [];

  const toCamelCase = (str) => str.toLowerCase().replace(/ /g, "_");

  //? Define cómo se debe renderizar el contenido de cada celda dependiendo
  //? de la página actual y el tipo de columna.
  const renderCellContent = (item, key) => {
    switch (currentPage) {
      case "contact":
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
          return item[toCamelCase(key)];
        }
      case "booking":
        if (key === "Contact") {
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
          return item[toCamelCase(key)];
        }
      case "room":
        if (key === "Room Name") {
          return (
            <div>
              <img src={item.room_photo} alt={`Room ${item.room_number}`} />
              <span>{item.room_number}</span>
            </div>
          );
        } else if (key === "Offer Price") {
          const discount = item.price * 0.8; // 20% de descuento por ejemplo
          return `$${discount.toFixed(2)}`;
        } else if (key === "Status") {
          return item.room_status === "Available" ? "Available" : "Booked";
        } else {
          return item[toCamelCase(key)];
        }
      case "users":
        return item[toCamelCase(key)];
      default:
        return null;
    }
  };

  //? handleNextPage y handlePreviousPage controlan la paginación,
  //? cambiando de página al hacer clic en "Next" o "Previous".
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

  //? Define cómo se deben renderizar los selectores de cada página dependiendo
  //? de la página actual.
  const renderSelectors = () => {
    if (currentPage === "contact") {
      return (
        <SelectorWrapper>
          <button onClick={() => handleFilterChange("All")}>
            All Customers reviews
          </button>
          <button onClick={() => handleFilterChange("Published")}>
            Published
          </button>
          <button onClick={() => handleFilterChange("Archived")}>
            Archived
          </button>
        </SelectorWrapper>
      );
    } else if (currentPage === "room") {
      return (
        <SelectorWrapper>
          <button onClick={() => handleFilterChange("All")}>All Rooms</button>
          <button onClick={() => handleFilterChange("Available Rooms")}>
            Available Rooms
          </button>
          <button onClick={() => handleFilterChange("Occupied Rooms")}>
            Occupied Rooms
          </button>
          <button onClick={() => handleFilterChange("Price")}>Price</button>
        </SelectorWrapper>
      );
    } else if (currentPage === "booking") {
      return (
        <SelectorWrapper>
          <button onClick={() => handleFilterChange("All")}>
            All Bookings
          </button>
          <button onClick={() => handleFilterChange("Check In")}>
            Check In
          </button>
          <button onClick={() => handleFilterChange("Check Out")}>
            Check Out
          </button>
          <button onClick={() => handleFilterChange("In Progress")}>
            In Progress
          </button>
        </SelectorWrapper>
      );
    } else if (currentPage === "users") {
      return (
        <SelectorWrapper>
          <button onClick={() => handleFilterChange("All")}>
            All Employees
          </button>
          <button onClick={() => handleFilterChange("Active Employee")}>
            Active Employee
          </button>
          <button onClick={() => handleFilterChange("Inactive Employee")}>
            Inactive Employee
          </button>
          <SearchInput
            type="text"
            placeholder="Search by employee name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SelectorWrapper>
      );
    }
  };

  return (
    <TableWrapper>
      {renderSelectors()}
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

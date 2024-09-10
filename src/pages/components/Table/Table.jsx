import { useState, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./__table.scss";
import contactData from "../../../data/falseData_contact.json";
import roomData from "../../../data/falseData_rooms.json";
import userData from "../../../data/falseData_users.json";

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
  const [paginatedData, setPaginatedData] = useState([]); //? Agregar estado para paginatedData (drag and drop)

  //? Manejar los datos según la página actual
  const data = useMemo(() => {
    if (currentPage === "contact") {
      return contactData;
    } else if (currentPage === "room") {
      return roomData;
    } else if (currentPage === "users") {
      return userData;
    } else if (currentPage === "booking") {
      //? Combinar datos de usuarios y habitaciones
      return userData.map((user, index) => ({
        ...user,
        room: roomData[index % roomData.length],
      }));
    }
    return [];
  }, [currentPage]);

  //? Filtrar los datos según la página y filtro
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
        filtered = data.filter((item) => item.room_status === "Available");
      } else if (filter === "Occupied Rooms") {
        filtered = data.filter((item) => item.room_status !== "Available");
      } else if (filter === "Price") {
        // filtered = [...data].sort((a, b) => a.price - b.price);
        filtered = [...data].sort(
          (a, b) =>
            parseFloat(a.rate.substring(1)) - parseFloat(b.rate.substring(1))
        );
      }
    } else if (currentPage === "booking") {
      if (filter === "Check In") {
        // filtered = [...data].sort(
        //   (a, b) => new Date(b.check_in) - new Date(a.check_in)
        // );
        filtered = [...data].sort(
          (a, b) => new Date(b.room.check_in) - new Date(a.room.check_in)
        );
      } else if (filter === "Check Out") {
        // filtered = [...data].sort(
        //   (a, b) => new Date(b.check_out) - new Date(a.check_out)
        // );
        filtered = [...data].sort(
          (a, b) => new Date(b.room.check_out) - new Date(a.room.check_out)
        );
      } else if (filter === "In Progress") {
        filtered = data.filter((item) => item.statusBooking === "In Progress");
      }
    } else if (currentPage === "users") {
      if (filter === "Active Employee") {
        filtered = data.filter((item) => item.status === "Active");
      } else if (filter === "Inactive Employee") {
        filtered = data.filter((item) => item.status === "Inactive");
      }

      if (searchTerm) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }

    return filtered;
  }, [filter, searchTerm, currentPage, data]);

  //? Ordena por defecto los datos en cada página
  const sortedData = useMemo(() => {
    let sorted = filteredData;

    if (currentPage === "room") {
      //? Ordena por número de habitación por defecto
      sorted = [...filteredData].sort((a, b) => a.room_number - b.room_number);
    } else {
      //? Ordena por Date
      sorted = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return sorted;
  }, [filteredData, currentPage]);

  //?  Calcula el número total de páginas dividiendo la longitud de los datos por ITEMS_PER_PAGE
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  //?  selecciona los datos para mostrar en la página actual con slice
  //?(paginar es tomar un subconjunto de los datos totales).
  useMemo(() => {
    const start = (currentPageIndex - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedData(sortedData.slice(start, end));
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
          return <span>#{item.id_review}</span>;
        } else if (key === "Date") {
          return <span>{item.guest_date_review}</span>
        }else if (key === "Customer") {
          return (
            <div>
              <span>{item.guest_name}</span><br/>
              <span>{item.email}</span><br/>
              <span>{item.phone}</span>
            </div>
          );
        } else if (key === "Comment") {
          return (
            <div>
              {item.rate_review}
              <br />
              {item.comment_review}
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

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = Array.from(paginatedData);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    //? Actualizar el estado con el nuevo orden
    setPaginatedData(reorderedItems);
  };

  return (
    <TableWrapper>
      {renderSelectors()}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <StyledTable ref={provided.innerRef} {...provided.droppableProps}>
              <TableHeader>
                <tr>
                  {columns.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </TableHeader>

              <TableBody>
                {paginatedData.map((item, index) => (
                  <Draggable
                    key={item.id ? item.id.toString() : `fallback-${index}`}
                    draggableId={
                      item.id ? item.id.toString() : `fallback-${index}`
                    }
                    index={index}
                  >
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {columns.map((col) => (
                          <td key={col}>{renderCellContent(item, col)}</td>
                        ))}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </StyledTable>
          )}
        </Droppable>
      </DragDropContext>

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

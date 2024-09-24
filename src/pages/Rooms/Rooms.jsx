import { useEffect, useMemo, useState } from "react";
import { fetchRooms } from "../../features/rooms/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../components/Table/Table";
import roomData from "../../data/falseData_rooms.json";

const Rooms = () => {
  const dispatch = useDispatch();

  // Obtenemos los datos y el estado del slice de rooms
  const rooms = useSelector((state) => state.rooms.rooms);
  const status = useSelector((state) => state.rooms.status);
  const error = useSelector((state) => state.rooms.error);

  const [currentFilter, setCurrentFilter] = useState("Available");

  //? Dispatch para cargar los datos al montar el componente
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRooms());
    }
  }, [dispatch, status]);

  //?Función para gestionar las columnas de la tabla de rooms
  const columns = useMemo(() => {
    return [
      "Room Number",
      "Room Type",
      "Amenities",
      "Price",
      "Offer Price",
      "Status",
    ];
  }, []);

  //? Filtros para la página de rooms
  const selectors = [
    { label: "Available", value: "Available" },
    { label: "Booked", value: "Booked" },
  ];

  //? Filtrar datos basados en el filtro actual
  // const filteredData = roomData.filter((room) => room.room_status === currentFilter);
  const filteredData = useMemo(() => {
    return rooms.filter((room) => room.room_status === currentFilter);
  }, [rooms, currentFilter]);

  //? Renderizar el contenido de las celdas
  const renderCellContent = (item, column) => {
    // console.log(item);
    switch (column) {
      case "Room Number":
        return (
          <div>
            <img src={item.room_picture} alt="picture room" />
            <div>
              <span>Room id: #{item.room_id}</span>
              <br />
              <span>Room number: {item.room_number}</span>
              <br />
              <span>Room type: {item.room_bedType}</span>
            </div>
          </div>
        );
      case "Room Type":
        return <span>{item.room_type}</span>;
      case "Amenities":
        return <span>{item.room_facilities}</span>;
      case "Price":
        return <span>${item.room_price}</span>;
      case "Offer Price": {
        //? Como room_price es un string, elimino el símbolo de moneda antes de hacer la operación.
        return <span>- 20% = ${(item.room_price * 0.8).toFixed(2)}</span>;
      }
      case "Status":
        return <span>{item.room_status}</span>;
      default:
        return null;
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Room</h1>

      <TableComponent
        selectors={selectors}
        columns={columns}
        data={filteredData}
        onFilterChange={setCurrentFilter}
        currentFilter={currentFilter}
        renderCellContent={renderCellContent}
        defaultSortColumn="Price"
        defaultSortDirection="asc"
      />
    </div>
  );
};

export default Rooms;

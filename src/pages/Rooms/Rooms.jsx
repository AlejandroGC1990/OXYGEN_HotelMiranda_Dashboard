import { useEffect } from "react";
import { fetchRooms } from "../../features/rooms/roomsThunk";
import { filterRoomsByStatus } from "../../features/rooms/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../components/Table/Table";

const Rooms = () => {
  const dispatch = useDispatch();
  //? Obtenemos los datos y el estado del slice de rooms
  const rooms = useSelector((state) => state.rooms.rooms);
  const status = useSelector((state) => state.rooms.status);
  const error = useSelector((state) => state.rooms.error);

  //? Dispatch para cargar los datos al montar el componente
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRooms());
    }
  }, [dispatch, status]);

  //? Filtros para la página de rooms
  const selectors = [
    { label: "All", value: "All" },
    { label: "Available", value: "Available" },
    { label: "Booked", value: "Booked" },
  ];

  //? Filtrar datos basados en el filtro actual
  // const handleStatusFilter = (status) => {
  //   dispatch(filterRoomsByStatus(status));
  // };

  //?Constante para declarar las columnas de la tabla de rooms
  const columns = [
    { header: "Room Number", accessor: "room_number" },
    { header: "Room Type", accessor: "room_type" },
    { header: "Amenities", accessor: "room_facilities" },
    { header: "Price", accessor: "room_price" },
    { header: "Offer Price", accessor: "offer_price" }, 
    { header: "Status", accessor: "room_status" },
  ];

  //? Renderizar el contenido de las celdas
  const renderCellContent = (item, column) => {
    // console.log(item);
    switch (column) {
      case "room_number":
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
      case "room_type":
        return <span>{item.room_type}</span>;
      case "room_facilities":
        return <span>{item.room_facilities.join(', ')}</span>;
      case "room_price":
        return <span>${item.room_price.toFixed(2)}</span>;
      case "offer_price": {
        //? Como room_price es un string, elimino el símbolo de moneda antes de hacer la operación.
        return <span>- 20% = ${(item.room_price * 0.8).toFixed(2)}</span>;
      }
      case "room_status":
        return <span>{item.room_status}</span>;
      default:
        return null;
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Room</h1>

      <TableComponent
        cols={columns}
        data={rooms}
        renderCellContent={renderCellContent}
      />
    </div>
  );
};

export default Rooms;

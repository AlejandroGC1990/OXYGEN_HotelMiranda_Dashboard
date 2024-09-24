import { useEffect, useMemo, useState, useCallback } from "react";
import TableComponent from "../components/Table/Table";
import {
  getAllThunk,
  archiveContact,
} from "../../features/contact/contactThunk";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../features/contact/contactSlice";

const Contact = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts); //? Obtener contactos desde Redux
  const [filter, setFilter] = useState("All");

  //? Conseguir los contactos al cargar el componente
  useEffect(() => {
    dispatch(getAllThunk());
  }, [dispatch]);

  //?Función para gestionar las columnas de la tabla de contacto
  const columns = useMemo(() => {
    return ["Order Id", "Date", "Customer", "Comment", "Action"];
  }, []);

  //? Filtros para la página de Contact
  const selectors = useMemo(
    () => [
      { value: "All", label: "All Reviews" },
      { value: "Archived", label: "Archived" },
    ],
    []
  );

  //?Function para filtrar datos basados en el filtro seleccionado
  const filteredData = useMemo(() => {
    if (!Array.isArray(contacts)) return [];

    let data = contacts;

    //? Filtrar por estado de revisión
    if (filter === "Archived") {
      data = data.filter((item) => item.guest_statusReview === "archived");
    }

    // Ordenar por fecha (fecha completa) en orden descendente
    return data
      .slice() // Clonar el array para evitar mutaciones
      .sort((a, b) => new Date(b.guest_DateReview) - new Date(a.guest_DateReview));
  }, [filter, contacts]);

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [contacts]);

  //?Función para manejar el cambio de filtro
  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  });

  //? Función para el manejo del botón Archived
  const handleArchiveClick = (id) => {
    dispatch(archiveContact(id));
    setFilter("Archived");
  };

  //? Función para renderizar los datos en las celdas según la columna
  const renderCellContent = (item, col) => {
    switch (col) {
      case "Order Id":
        return <span>#{item.guest_idReview}</span>;
      case "Date":
        return (
          <div>
            <span>{item.guest_timeDateReview}</span> -{" "}
            <span>{item.guest_DateReview}</span>
          </div>
        );
      case "Customer":
        return (
          <div>
            {/* <img src={item.img} alt="guest img" width="30" height="30" /> */}
            <span>{item.guest_name}</span>
            <br />
            <span>{item.guest_email}</span>
            <br />
            <span>{item.guest_phone}</span>
          </div>
        );
      case "Comment":
        return (
          <div>
            <span>{item.guest_rateReview}</span>
            <br />
            <span>{item.guest_commentReview}</span>
          </div>
        );
      case "Action":
        return (
          <button onClick={() => handleArchiveClick(item.id)}>Archived</button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <h1>Contact</h1>
      <TableComponent
        columns={columns}
        data={filteredData}
        onFilterChange={handleFilterChange}
        currentFilter={filter}
        selectors={selectors}
        renderCellContent={renderCellContent}
        defaultSortColumn="Date"
        defaultSortDirection="desc"
      />
    </>
  );
};

export default Contact;

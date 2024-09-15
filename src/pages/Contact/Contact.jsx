// import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import TableComponent from "../components/Table/Table";
import contactData from "../../data/falseData_contact.json";

const Contact = () => {
  const [filter, setFilter] = useState("All");
  const [contact, setContacts] = useState(contactData);

  //?Función para gestionar las columnas de la tabla de contacto
  const columns = useMemo(() => {
    return ["Order Id", "Date", "Customer", "Comment", "Action"];
  }, []);

  //? Filtros para la página de Contact
  const selectors = useMemo(
    () => [
      { value: "All", label: "All Reviews" },
      // { value: "Published", label: "Published" },
      { value: "Archived", label: "Archived" },
    ],
    []
  );

  //?Function para filtrar datos basados en el filtro seleccionado
  const filteredData = useMemo(() => {
    let filtered = contact;
    
    // if (filter === "Published") {
    //   return contact.filter((item) => item.status === "published");
    // } else
    if (filter === "Archived") {
      return contact.filter((item) => item.guest_statusReview === "archived");
    }
    //? Ordenar por fecha (fecha completa) en orden descendente
    return filtered.sort((a, b) => {
      const dateA = new Date(a.guest_DateReview);
      const dateB = new Date(b.guest_DateReview);
      return dateB - dateA; //? Orden descendente
    });
  }, [filter, contact]);

  //?Función para manejar el cambio de filtro
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  //? Función para el manejo del botón Archived
  const handleArchiveClick = (id) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, status: "archived" } : contact
      )
    );
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

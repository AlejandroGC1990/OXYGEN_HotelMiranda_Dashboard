import { useEffect } from "react";
import { fetchContacts } from "../../features/contact/contactThunk";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../components/Table/Table";

const Contact = () => {
  const dispatch = useDispatch();
  
  //? Obtenemos los datos y el estado del slice de contacts
  const contacts = useSelector((state) => state.contact.contacts || []);
  const status = useSelector((state) => state.contact.status);
  const error = useSelector((state) => state.contact.error);

  // const [filter, setFilter] = useState("All"); //? Añadido estado para el filtro

  //? Conseguir los contactos al cargar el componente
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContacts());
    }
  }, [dispatch, status]);

  //? Filtros para la página de Contact
  // const selectors = [
  //   { value: "All", label: "All Reviews" },
  //   { value: "Archived", label: "Archived" },
  // ];

  //?Función para gestionar las columnas de la tabla de contacto
  const columns = [
    { header: "Order Id", accessor: "order_id" },
    { header: "Date", accessor: "date" },
    { header: "Customer", accessor: "customer" },
    { header: "Comment", accessor: "comment" },
    { header: "Action", accessor: "action" },
  ];

  //?Function para filtrar datos basados en el filtro seleccionado
  // const filteredData = useMemo(() => {
  //   if (!Array.isArray(contacts)) return [];

  //   let data = contacts;

  //   //? Filtrar por estado de revisión
  //   if (filter === "Archived") {
  //     data = data.filter((item) => item.guest_statusReview === "archived");
  //   }

  //   // Ordenar por fecha (fecha completa) en orden descendente
  //   return data
  //     .slice() 
  //     .sort(
  //       (a, b) => new Date(b.guest_DateReview) - new Date(a.guest_DateReview)
  //     );
  // }, [filter, contacts]);

  //?Función para manejar el cambio de filtro
  // const handleFilterChange = useCallback((newFilter) => {
  //   setFilter(newFilter);
  // });

  //? Función para el manejo del botón Archived
  const handleArchiveClick = (id) => {
    dispatch(archiveContact(id));
    setFilter("Archived");
  };

  //? Función para renderizar los datos en las celdas según la columna
  const renderCellContent = (item, column) => {
    switch (column) {
      case "order_id":
        return <span>#{item.guest_idReview}</span>;
      case "date":
        return (
          <div>
            <span>{item.guest_timeDateReview}</span> -{" "}
            <span>{item.guest_DateReview}</span>
          </div>
        );
      case "customer":
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
      case "comment":
        return (
          <div>
            <span>{item.guest_rateReview}</span>
            <br />
            <span>{item.guest_commentReview}</span>
          </div>
        );
      case "action":
        return (
          <button onClick={() => handleArchiveClick(item.id)}>Archived</button>
        );
      default:
        return null;
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <>
      <h1>Contact</h1>
      <TableComponent
        cols={columns}
        data={contacts}
        renderCellContent={renderCellContent}
        // onFilterChange={handleFilterChange}
        // currentFilter={filter}
        // selectors={selectors}
        // defaultSortColumn="Date"
        // defaultSortDirection="desc"
      />
    </>
  );
};

export default Contact;

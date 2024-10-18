import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../features/contact/contactThunk";
import Table from "../components/Table/Table";
import Cookies from "js-cookie";
import { RootState, AppDispatch } from "../../app/store";
import { Contact as ContactType } from '../../interfaces/contact';
import { promiseStatus } from "../../utils/promises";
// import { filterContactsByStatus } from "../../features/contact/contactSlice";

const Contact: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredContacts:
    contacts,
    status,
    error
  } = useSelector((state: RootState) => state.contact);

  //? Función para obtener contactos desde el servidor
  const fetchData = async () => {
    const token = Cookies.get('user'); 
    if (token) {
      const resultAction = await dispatch(fetchContacts(token));
      if (fetchContacts.rejected.match(resultAction)) {
        console.error('Error al obtener contactos:', resultAction.error.message);
      }
    } else {
      console.error('No se encontró el token de autorización.');
    }
  };
  // const fetchData = useCallback(async () => {
  //   const token = Cookies.get("user");
  //   if (!token) {
  //     console.error("No auth token found");
  //     return;
  //   }

  //   try {
  //     const result = await dispatch(fetchContacts(token)); 
  //     if (!fetchContacts.rejected.match(result)) {
  //       console.log("Resultado de la API:", result);
  //     } else {
  //       console.error("Error al obtener los contactos:", result.error.message);
  //     }
  //   } catch (err) {
  //     console.error("Error al obtener los contactos:", err);
  //   }
  // }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, []);
  // }, [fetchData]);

  // const selectors = [
  //   { value: "All", label: "All Reviews" },
  //   { value: "archived", label: "Archived" },
  // ];

  const columns: { header: string; accessor: keyof ContactType }[] = useMemo(() => [
    { header: "Order Id", accessor: "guest_idReview" },
    { header: "Date", accessor: "guest_DateReview" },
    { header: "Customer", accessor: "guest_name" },
    { header: "Comment", accessor: "guest_commentReview" },
    // { header: "Action", accessor: "id" },
  ], []);

  // //? Función para cambiar el filtro
  // const handleFilterChange = useCallback((newFilter: string) => {
  //   dispatch(filterContactsByStatus(newFilter));
  // }, [dispatch]);

  // //? Manejar el clic para archivar
  // const handleArchiveClick = useCallback((id: number) => {
  //   console.log(`Archivar contacto con id: ${id}`);
  // }, []);

  //? Renderizado personalizado de las celdas
  const renderCellContent = useCallback((item: ContactType, column: keyof ContactType) => {
    switch (column) {
      case "guest_idReview":
        return <span>#{item.guest_idReview}</span>;
      case "guest_DateReview":
        return (
          <div>
            <span>{item.guest_timeDateReview}</span> -{" "}
            <span>{item.guest_DateReview}</span>
          </div>
        );
      case "guest_name":
        return (
          <div>
            <span>{item.guest_name}</span>
            <br />
            <span>{item.guest_email}</span>
            <br />
            <span>{item.guest_phone}</span>
          </div>
        );
      case "guest_commentReview":
        return (
          <div>
            <span>{item.guest_rateReview}</span>
            <br />
            <span>{item.guest_commentReview}</span>
          </div>
        );
      // case "id":
      //   return (
      //     <button onClick={() => handleArchiveClick(item.id)}>Archive</button>
      //   );
      default:
        return null;
    }
  }, []);
  // }, [handleArchiveClick]);

  if (status === promiseStatus.PENDING) return <div>Loading...</div>;
  if (status === promiseStatus.REJECTED) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Contact</h1>
      <Table
        cols={columns}
        data={contacts}
        renderCellContent={renderCellContent}
        // onFilterChange={handleFilterChange}
        // currentFilter="All"
        // selectors={selectors}
        // defaultSortColumn="guest_DateReview"
        // defaultSortDirection="desc"
      />
    </>
  );
};

export default Contact;

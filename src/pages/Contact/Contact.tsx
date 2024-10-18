import { useEffect, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { archiveContact, fetchContacts, publishContact } from "../../features/contact/contactThunk";
import { filterContactsByStatus } from "../../features/contact/contactSlice";

import Table from "../components/Table/Table";
import RecentMessages from "../components/RecentMessages/RecentMessages";

import Cookies from "js-cookie";
import { RootState, AppDispatch } from "../../app/store";
import { Contact as ContactType } from '../../interfaces/contact';
import { promiseStatus } from "../../utils/promises";


const Contact: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredContacts:
    contacts,
    status,
    error
  } = useSelector((state: RootState) => state.contact);

  const [activeTab, setActiveTab] = useState<string>('All');
  const [filter, setFilter] = useState("All");


  const token = Cookies.get('user') || '';


  //? Función para obtener contactos desde el servidor
  const fetchData = async () => {
    if (token) {
      const resultAction = await dispatch(fetchContacts(token));
      if (fetchContacts.rejected.match(resultAction)) {
        console.error('Error al obtener contactos:', resultAction.error.message);
      }
    } else {
      console.error('No se encontró el token de autorización.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const selectors = [
    { label: "All", value: "All" },
    { label: "Archived", value: "Archived" },
    { label: "Published", value: "Published" }
  ];

  //? Función para cambiar el selector de la tabla
  const filteredContacts = contacts.filter(contact => {
    if (filter === "All") return true;
    if (filter === "Archived") return contact.guest_statusReview === "archived";
    if (filter === "Published") return contact.guest_statusReview === "publish";
    return false;
  });

  //? Manejar el clic para archivar
  const handleArchiveClick = useCallback(async (id: number) => {
    await dispatch(archiveContact({ id, token }));
  }, [dispatch]);

  //? Manejar el clic para publish
  const handlePublishClick = useCallback(async (id: number) => {
    await dispatch(publishContact({ id, token }));
  }, [dispatch]);


  const columns: { header: string; accessor: keyof ContactType }[] = useMemo(() => [
    { header: "Order Id", accessor: "guest_idReview" },
    { header: "Date", accessor: "guest_DateReview" },
    { header: "Customer", accessor: "guest_name" },
    { header: "Comment", accessor: "guest_commentReview" },
    { header: "Action", accessor: "guest_idReview" }
  ], []);

  //? Renderizado personalizado de las celdas
  const renderCellContent = useCallback((item: ContactType, column: keyof ContactType) => {
    switch (column) {
      case "guest_idReview":
        return <span>#{item.guest_idReview}</span>;
      case "guest_DateReview":
        return (
          <div>
            <span>{item.guest_timeDateReview}</span> - {" "}
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
      case "guest_idReview":
        return (
          <>
            <button onClick={() => handlePublishClick(item.guest_idReview)}>Publish</button>
            <button onClick={() => handleArchiveClick(item.guest_idReview)}>Archive</button>
          </>
        );
      default:
        return null;
    }
  }, [handleArchiveClick, handlePublishClick]);


  if (status === promiseStatus.PENDING) return <div>Loading...</div>;
  if (status === promiseStatus.REJECTED) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Contact</h1>

      <RecentMessages contact={contacts} />

      <Table
        cols={columns}
        data={filteredContacts}
        renderCellContent={renderCellContent}
        currentFilter={filter}
        setFilter={setFilter}
        selectors={selectors}
      />
    </>
  );
};

export default Contact;

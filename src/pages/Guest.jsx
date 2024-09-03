import { useParams } from "react-router-dom";

const Guest = () => {
  const {id} = useParams();
  
  return (
    <>
      <h1>Guest</h1>
      <p>{id ? `ID: ${id}` : "Get All"}</p>
    </>
  );
};

export default Guest;

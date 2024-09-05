import "./__table.scss";
import data from "../../../data/falseData_contact.json";
import styled from "styled-components";
import { useState } from "react";

// // const Table = styled.table`
// //   width: 100%;
// // `;

// const TableComponent = () => {

//   return (
//     <div className="table">
//       <div className="table__containerSelectors">
//         <div className="table__containerSelectors__selector">
//           <p>All Contact</p>
//         </div>
//         <div className="table__containerSelectors__selector">
//           <p>Archived</p>
//         </div>
//       </div>

//       <table className="table__containerTable">
//         <thead className="table__containerTable__header">
//           <tr>
//             <th>
//               <strong>Order Id</strong>
//             </th>
//             <th>
//               <strong>Date</strong>
//             </th>
//             <th>
//               <strong>Customer</strong>
//             </th>
//             <th>
//               <strong>Comment</strong>
//             </th>
//             <th>
//               <strong>Action</strong>
//             </th>
//           </tr>
//         </thead>

//         <tbody className="table__containerTable__content">
//           {data.map((data) => {
//             return (
//               <tr key={data.id_review}>
//                 <td>#{data.id_review}</td>
//                 <td>{data.date}</td>
//                 <td>
//                   <div>
//                     {data.name}
//                     <br/>
//                     {data.email}
//                     <br/>
//                     {data.phone}
//                   </div>
//                 </td>
//                 <td>
//                   <div>
//                     {data.pounts}
//                     <br/>
//                     {/* {data.comment} */}
//                     patata patata patata patata patata patata patata patata patata patata patata patata patata patata patata
//                   </div>
//                 </td>
//                 <td className="table__containerTable__content__register__actions">
//                   <td>Publish</td>
//                   <td>Archive</td>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableComponent;

const TableWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const SelectorContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Selector = styled.div`
  margin-right: 20px;
  cursor: pointer;
  padding: 10px;
  background-color: ${({ active }) => (active ? "#007bff" : "#f0f0f0")};
  color: ${({ active }) => (active ? "white" : "#555")};
  border-radius: 5px;

  p {
    font-weight: bold;
  }

  &:hover {
    background-color: #0056b3;
    color: white;
  }
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

const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;

  span {
    margin: 2px 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  button {
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 3px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const ReviewText = styled.div`
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TableComponent = () => {
  const [showArchived, setShowArchived] = useState(false);

  const filteredData = showArchived
    ? data.filter((item) => item.review_archive === true)
    : data;

  const sortedData = filteredData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <TableWrapper>
      <SelectorContainer>
        <Selector active={!showArchived} onClick={() => setShowArchived(false)}>
          <p>All Contact</p>
        </Selector>
        <Selector active={showArchived} onClick={() => setShowArchived(true)}>
          <p>Archived</p>
        </Selector>
      </SelectorContainer>

      {/* Tabla */}
      <StyledTable>
        <TableHeader>
          <tr>
            <th>Order Id</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </TableHeader>

        <TableBody>
          {sortedData.map((item) => (
            <tr key={item.id_review}>
              <td>#{item.id_review}</td>
              <td>{item.date}</td>
              <td>
                <CustomerInfo>
                  <span>{item.name}</span>
                  <span>{item.email}</span>
                  <span>{item.phone}</span>
                </CustomerInfo>
              </td>
              <td>
                <ReviewText>
                  {item.pounts} - patata patata patata patata patata patata
                  patata...
                </ReviewText>
              </td>
              <td>
                <ActionButtons>
                  <button>Archive</button>
                </ActionButtons>
              </td>
            </tr>
          ))}
        </TableBody>
      </StyledTable>
    </TableWrapper>
  );
};

export default TableComponent;

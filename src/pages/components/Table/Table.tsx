import { useState } from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  th,
  td {
    max-width: 200px;
    overflow-wrap: break-word;
    white-space: normal;
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  td button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 3px;
    cursor: pointer;
  }

  td button:hover {
    background-color: #0056b3;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;

  button {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;

  button {
    background-color: #f4f4f4;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-right: 10px;
  }

  button:hover {
    background-color: #e0e0e0;
  }
`;

const Tabla = <T,>({ cols, data, renderCellContent }: {
  cols: { header: string; accessor: keyof T }[];
  data: T[];
  renderCellContent: (item: T, column: keyof T) => React.ReactNode
}) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordsPerPage] = useState<number>(10);

  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 3) {
      pageNumbers.push(1);
      if (currentPage > 4) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) => (
      <button
        key={typeof number === "number" ? number : index.toString()}
        onClick={() => paginate(Number(number))}
        disabled={number === currentPage}
      >
        {number}
      </button>
    ));
  };

  return (
    <>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              {cols.map((cols) => (
                <th key={String(cols.accessor)}>{cols.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {cols.map((cols) => (
                  <td key={`${String(cols.accessor)}-${rowIndex}`}>
                    {renderCellContent(row, cols.accessor)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>

      <Pagination>
        <div className="pagination-controls">
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>
            &laquo; First
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lsaquo; Previous
          </button>
          {/* {renderPageNumbers().map((number, index) => (
            <div key={number.toString()} onClick={() => paginate(typeof number === "number" ? number : Number(number))}>
              {number}
            </div>
          ))} */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &rsaquo;
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last &raquo;
          </button>
        </div>
      </Pagination>
    </>
  );
};

export default Tabla;

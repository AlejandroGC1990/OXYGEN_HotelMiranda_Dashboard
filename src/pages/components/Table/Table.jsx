import { useState, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./__table.scss";
import PaginationComponent from "./Pagination";

const TableWrapper = styled.div`
  width: 100%;
  padding: 20px;
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

const SelectorWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;

// const SearchInput = styled.input`
//   padding: 5px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;

const TableComponent = ({ selectors, columns, data, onFilterChange, currentFilter, renderCellContent  }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1); //?Almacena el íncide de la página actual de la tabla.

  const ITEMS_PER_PAGE = 10;

  //?  selecciona los datos para mostrar en la página actual con slice
  //?(paginar es tomar un subconjunto de los datos totales).
  const paginatedData = useMemo(() => {
    const start = (currentPageIndex - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return data.slice(start, end);
  }, [currentPageIndex, data]);

  //?  Calcula el número total de páginas dividiendo la longitud de los datos por ITEMS_PER_PAGE
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  // const handleDragEnd = (result) => {
  //   if (!result.destination) {
  //     return;
  //   }

  //   const reorderedItems = Array.from(paginatedData);
  //   const [movedItem] = reorderedItems.splice(result.source.index, 1);
  //   reorderedItems.splice(result.destination.index, 0, movedItem);

  //   //? Actualizar el estado con el nuevo orden
  //   setPaginatedData(reorderedItems);
  // };

  return (
    <TableWrapper>
      {/* Selectores */}
      <SelectorWrapper>
        {selectors.map((filter, index) => (
          <button
            key={index}
            onClick={() => onFilterChange(filter.value)}
            className={currentFilter === filter.value ? "active" : ""}
          >
            {filter.label}
          </button>
        ))}
      </SelectorWrapper>

      {/* Tabla */}
      <StyledTable>
        <TableHeader>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col}>{renderCellContent(item, col)}</td>
              ))}
            </tr>
          ))}
        </TableBody>
      </StyledTable>

      {/* Paginación */}
      <PaginationComponent
        currentPageIndex={currentPageIndex}
        totalPages={totalPages}
        onPrevious={() => setCurrentPageIndex((prev) => Math.max(prev - 1, 1))}
        onNext={() =>
          setCurrentPageIndex((prev) => Math.min(prev + 1, totalPages))
        }
      />
    </TableWrapper>
  );
};

TableComponent.propTypes = {
  selectors: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  renderCellContent: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  currentFilter: PropTypes.string.isRequired,
};

export default TableComponent;

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
    cursor: pointer;
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

const TableComponent = ({
  selectors,
  columns,
  data,
  onFilterChange,
  currentFilter,
  renderCellContent,
  defaultSortColumn,
  defaultSortDirection,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1); //?Almacena el íncide de la página actual de la tabla.
  const [sortColumn, setSortColumn] = useState(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState(
    defaultSortDirection || "asc"
  );

  const ITEMS_PER_PAGE = 10;

  //! ORDENACIÓN
  //? Función para manejar el orden al hacer click en los encabezados
  const handleSort = (col) => {
    if (sortColumn === col) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc")); //? Cambiar la dirección
    } else {
      setSortColumn(col);
      setSortDirection("asc"); //? Dirección ascendente por defecto
    }
  };

  //? Ordenar los datos dependiendo de la columna y la dirección
  const sortedData = useMemo(() => {
    const sorted = [...data];
    if (sortColumn) {
      sorted.sort((a, b) => {
        let aValue = a[sortColumn];
        let bValue = b[sortColumn];
        console.log(`Sorting ${sortColumn}: ${aValue} vs ${bValue}`);

        if (typeof aValue === 'string' && !isNaN(Date.parse(aValue))) {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else if (typeof aValue === 'string' && aValue.startsWith('$')) {
          aValue = parseFloat(aValue.replace('$', ''));
          bValue = parseFloat(bValue.replace('$', ''));
        }

        if (aValue < bValue) {
          return sortDirection === "asc" ? -1 : 1;
        } else if (aValue > bValue) {
          return sortDirection === "desc" ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    return sorted;
  }, [sortColumn, sortDirection, data]);

  //!PAGINACIÓN
  //?  selecciona los datos para mostrar en la página actual con slice
  //?(paginar es tomar un subconjunto de los datos totales).
  const paginatedData = useMemo(() => {
    const start = (currentPageIndex - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedData.slice(start, end);
  }, [currentPageIndex, sortedData]);

  //?  Calcula el número total de páginas dividiendo la longitud de los datos por ITEMS_PER_PAGE
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

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
              <th key={index} onClick={() => handleSort(col)}>
                {col}{" "}
                {sortColumn === col
                  ? sortDirection === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
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
  // selectors: PropTypes.array.isRequired,
  selectors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.array.isRequired,
  renderCellContent: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  // currentFilter: PropTypes.string.isRequired,
  defaultSortColumn: PropTypes.string,
  defaultSortDirection: PropTypes.oneOf(["asc", "desc"]),
};

export default TableComponent;

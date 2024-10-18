import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 3px;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #0056b3;
    }
  }
`;

const PaginationComponent = ({ currentPageIndex, totalPages, onPrevious, onNext }) => {
  return (
    <PaginationWrapper>
      <button onClick={onPrevious} disabled={currentPageIndex === 1}>
        Previous
      </button>
      <span>
        Page {currentPageIndex} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPageIndex === totalPages}
      >
        Next
      </button>
    </PaginationWrapper>
  );
};

PaginationComponent.propTypes = {
  currentPageIndex: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default PaginationComponent;

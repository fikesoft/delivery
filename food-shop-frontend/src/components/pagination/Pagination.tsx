import React from 'react';

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void  ; // Callback for page changes
  currentPage?: number; // Optional current page prop
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage = 1, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button 
        className="previous-page" 
        disabled={currentPage === 1} 
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <ul className="pages">
        {pages.map(page => (
          <li key={page}>
            <button 
              className={page === currentPage ? 'active' : ''} 
              onClick={() => onPageChange && onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button 
        className="next-page" 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
      >
        Next 
      </button>
    </div>
  );
};

export default Pagination;

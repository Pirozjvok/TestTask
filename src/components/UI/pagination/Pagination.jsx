import React, { useMemo } from "react";
import cl from "./Pagination.module.css";

function range(n) {
  return Array.from({ length: n }, (x, i) => i);
}

const Pagination = ({ total, limit, page, setPage }) => {
  const pageCount = Math.ceil(total / limit);
  const pages = useMemo(() => range(pageCount), [pageCount]);

  return (
    <div className={cl.pagination}>
      {pages.map(n => (
        <div 
          className={cl.page} 
          aria-selected={n === page} 
          tabIndex={0}
          key={n}
          onClick={() => setPage(n)}
          onKeyDown={e => e.key === 'Enter' && setPage(n)}>
          {n + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;

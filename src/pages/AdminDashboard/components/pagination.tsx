import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import Styles from "../../../styles/Dashboard/Dashboard.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

type paginationProp = {
  onPageChange: any;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
};

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: paginationProp) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange!.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange![paginationRange!.length - 1];
  //   const diabledStyle =
  //     currentPage === 1 ? `${Styles.disabled} ${Styles.pagination_item}` : "";

  return (
    <div className={Styles.paginationDiv}>
      <ul className={Styles.pagination_container}>
        {/* Left navigation arrow */}
        <li
          className={
            currentPage === 1
              ? `${Styles.disabled} ${Styles.arrow}`
              : Styles.arrow
          }
          onClick={onPrevious}
        >
          <MdChevronLeft fontSize={20} color="#5c00dd" cursor="pointer" />
        </li>
        {paginationRange!.map((pageNumber, i) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return <li className={`${Styles.dots} `}>&#8230;</li>;
          }

          const selectedStyle =
            pageNumber === currentPage
              ? `${Styles.selected} ${Styles.pagination_item}`
              : Styles.pagination_item;

          // Render our Page Pills
          return (
            <li
              key={i}
              className={selectedStyle}
              onClick={() => {
                onPageChange(pageNumber);
                console.log(pageNumber);
              }}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
          className={
            currentPage === lastPage
              ? `${Styles.disabled} ${Styles.arrow}`
              : Styles.arrow
          }
          onClick={onNext}
        >
          <MdChevronRight fontSize={20} color="#5c00dd" cursor="pointer" />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

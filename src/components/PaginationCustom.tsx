import {FC} from "react";
import {Pagination} from "react-bootstrap";

type TSetCurrentPage = React.Dispatch<React.SetStateAction<number>>;
const PaginationEmpty: FC = () => <Pagination.Item disabled><span>&nbsp;&nbsp;</span></Pagination.Item>;
const PaginationFirst: FC<{goFirst:  ()=>void, currentPage: number}> = ({goFirst, currentPage}) => {
  const page = 1;
  return (
    <Pagination.Item active={page === currentPage} onClick={goFirst}
                     key={'page-' + page}>{page}</Pagination.Item>
  )
};
const PaginationLast: FC<{goLast:  ()=>void, currentPage: number, pageAmount: number}> = ({goLast, currentPage, pageAmount}) => {
  const page = pageAmount;
  return (
    <Pagination.Item active={page === currentPage} onClick={goLast}
                     key={'page-' + page}>{page}</Pagination.Item>
  )
};type TPaginationCustomProps = {setCurrentPage:  TSetCurrentPage, currentPage: number, pageAmount: number};

const extraVisiblePages = 2; // ellipsis and first/last page

const PaginationCustom: FC<TPaginationCustomProps> = ({setCurrentPage, currentPage, pageAmount}) => {
  const goNext = ()=> setCurrentPage(prevPage => ((prevPage < pageAmount) ? (prevPage + 1) : prevPage));
  const goPrev = ()=> setCurrentPage(prevPage => (prevPage > 1 ? (prevPage - 1) : prevPage));
  const goFirst = ()=> setCurrentPage(1);
  const goLast = ()=> setCurrentPage(pageAmount);
  const nextVisiblePages = 5;
  const prevVisiblePages = 5;
  const totalAmountOfVisible = 2* extraVisiblePages + nextVisiblePages + prevVisiblePages + 1; // considering also ellipsis, first and last page
  const paginationArray = [];
  if (pageAmount <= totalAmountOfVisible) {
    for (let i = 0; i < totalAmountOfVisible; i++) {
      const page = 1 + i;
      if (page <= pageAmount) {
        paginationArray.push(<Pagination.Item active={page === currentPage} onClick={() => setCurrentPage(page)}
                                              key={'page-' + page}>{page}</Pagination.Item>)
      } else {
        paginationArray.push(<PaginationEmpty/>)
      }
    }
  } else if (pageAmount === totalAmountOfVisible + 1) {
    // only one extra -> always only one ellipsis;
    const amountHidden = pageAmount - totalAmountOfVisible + 1; // one to make space for the ellipsis + the extra one
    if (currentPage < pageAmount - (extraVisiblePages + prevVisiblePages)) {
      for (let i = 0; i < (totalAmountOfVisible - extraVisiblePages); i++) {
        const page = i + extraVisiblePages - 1; // no ellipsis
        paginationArray.push(<Pagination.Item active={page === currentPage} onClick={()=>setCurrentPage(page)} key={'page-' + page}>{page}</Pagination.Item>)
      }
      paginationArray.push(<Pagination.Ellipsis disabled/>);
      paginationArray.push(<PaginationLast goLast={goLast} currentPage={currentPage} pageAmount={pageAmount} />);
    } else {
      paginationArray.push(<PaginationFirst goFirst={goFirst} currentPage={currentPage} />);
      paginationArray.push(<Pagination.Ellipsis disabled/>);
      for (let i = 0; i < (totalAmountOfVisible - extraVisiblePages); i++) {
        const page = i + 1 + amountHidden + 1; // start after the first page + the 2 hidden
        paginationArray.push(<Pagination.Item active={page === currentPage} onClick={()=>setCurrentPage(page)} key={'page-' + page}>{page}</Pagination.Item>)
      }
    }
  } else {
    // large amount of pages, from 1 to 2 ellipsis needed
    if (currentPage <= extraVisiblePages + prevVisiblePages + 1) {
      for (let i = 0; i < (nextVisiblePages + 1 + prevVisiblePages + extraVisiblePages); i++) {
        const page = i + extraVisiblePages - 1; // no ellipsis
        paginationArray.push(<Pagination.Item active={page === currentPage} onClick={()=>setCurrentPage(page)} key={'page-' + page}>{page}</Pagination.Item>)
      }
      paginationArray.push(<Pagination.Ellipsis disabled/>);
      paginationArray.push(<PaginationLast goLast={goLast} currentPage={currentPage} pageAmount={pageAmount} />);
    } else if (currentPage < pageAmount - (extraVisiblePages + nextVisiblePages)) {
      // double ellipsis
      paginationArray.push(<PaginationFirst goFirst={goFirst} currentPage={currentPage} />);
      paginationArray.push(<Pagination.Ellipsis disabled/>);

      for (let i = 0; i < (totalAmountOfVisible - 2*extraVisiblePages); i++) {
        const page = i + currentPage - prevVisiblePages;
        paginationArray.push(<Pagination.Item active={page === currentPage} onClick={()=>setCurrentPage(page)} key={'page-' + page}>{page}</Pagination.Item>)
      }
      paginationArray.push(<Pagination.Ellipsis disabled/>);
      paginationArray.push(<PaginationLast goLast={goLast} currentPage={currentPage} pageAmount={pageAmount} />);
    } else {
      paginationArray.push(<PaginationFirst goFirst={goFirst} currentPage={currentPage} />);
      paginationArray.push(<Pagination.Ellipsis disabled/>);

      for (let i = 0; i < (totalAmountOfVisible - extraVisiblePages); i++) {
        const page = i + pageAmount - (extraVisiblePages + nextVisiblePages + prevVisiblePages);
        paginationArray.push(<Pagination.Item active={page === currentPage} onClick={()=>setCurrentPage(page)} key={'page-' + page}>{page}</Pagination.Item>)
      }
    }
  }
  return (
    <Pagination>
      <Pagination.Prev onClick={goPrev} disabled={currentPage === 1}/>
      {paginationArray}
      <Pagination.Next onClick={goNext} disabled={currentPage === pageAmount}/>
    </Pagination>
  )
}

export default PaginationCustom;

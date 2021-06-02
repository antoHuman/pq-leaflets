import {FC} from "react";
import {Col, Pagination, Row} from "react-bootstrap";
import useMedia from "../hooks/useMedia";

type TSetCurrentPage = React.Dispatch<React.SetStateAction<number>>;
const PaginationEmpty: FC = () => <Pagination.Item disabled><span>&nbsp;&nbsp;</span></Pagination.Item>;
const PaginationFirst: FC<{goFirst:  ()=>void, currentPage: number}> = ({goFirst, currentPage}) => {
  const page = 1;
  return (<>
    <Pagination.Item active={page === currentPage} onClick={goFirst}
                     key={'page-' + page}>{page}</Pagination.Item>
    <Pagination.Ellipsis disabled/>
  </>)
};
const PaginationLast: FC<{goLast:  ()=>void, currentPage: number, pageAmount: number}> = ({goLast, currentPage, pageAmount}) => {
  const page = pageAmount;
  return (<>
    <Pagination.Ellipsis disabled/>
    <Pagination.Item active={page === currentPage} onClick={goLast}
                     key={'page-' + page}>{page}</Pagination.Item>
  </>
  )
};type TPaginationCustomProps = {setCurrentPage:  TSetCurrentPage, currentPage: number, pageAmount: number};

const extraVisiblePages = 2; // ellipsis and first/last page

const PaginationCustom: FC<TPaginationCustomProps> = ({setCurrentPage, currentPage, pageAmount}) => {
  const isBreakpointSm = useMedia('(min-width: 575px)');
  const goNext = ()=> setCurrentPage(prevPage => ((prevPage < pageAmount) ? (prevPage + 1) : prevPage));
  const goPrev = ()=> setCurrentPage(prevPage => (prevPage > 1 ? (prevPage - 1) : prevPage));
  const goFirst = ()=> setCurrentPage(1);
  const goLast = ()=> setCurrentPage(pageAmount);
  const nextVisiblePages = isBreakpointSm ? 2 : 1;
  const prevVisiblePages = isBreakpointSm ? 2 : 1;
  const totalAmountOfVisible = 2* extraVisiblePages + nextVisiblePages + prevVisiblePages + 1; // considering also ellipsis, first and last page
  const paginationArray = [];
  let hasPaginationFirst = false;
  let hasPaginationLast = false;
  if (pageAmount <= totalAmountOfVisible) {
    for (let i = 0; i < totalAmountOfVisible; i++) {
      const page = 1 + i;
      if (page <= pageAmount) {
        paginationArray.push(<Pagination.Item active={page === currentPage} onClick={() => setCurrentPage(page)}
                                              key={'page-' + page}>{page}</Pagination.Item>)
      } else {
        paginationArray.push(<PaginationEmpty key={'page-empty-' + page}/>)
      }
    }
  } else {
    let pagesArrayLength: number;
    let startingPage: number;
    if (pageAmount === totalAmountOfVisible + 1) {
      // only one extra -> always only one ellipsis;
      const amountHidden = pageAmount - totalAmountOfVisible + 1; // one to make space for the ellipsis + the extra one
      pagesArrayLength = totalAmountOfVisible - extraVisiblePages;
      if (currentPage < pageAmount - (extraVisiblePages + prevVisiblePages)) {
        startingPage = extraVisiblePages - 1; // no ellipsis
        hasPaginationLast = true;
      } else {
        hasPaginationFirst = true;
        startingPage = 1 + amountHidden + 1; // start after the first page + the 2 hidden
      }
    } else {
      // large amount of pages, from 1 to 2 ellipsis needed
      if (currentPage <= extraVisiblePages + prevVisiblePages + 1) {
        pagesArrayLength = nextVisiblePages + 1 + prevVisiblePages + extraVisiblePages;
        startingPage = extraVisiblePages - 1; // no ellipsis
        hasPaginationLast = true;
      } else if (currentPage < pageAmount - (extraVisiblePages + nextVisiblePages)) {
        // double ellipsis
        hasPaginationFirst = true;
        hasPaginationLast = true;
        pagesArrayLength = totalAmountOfVisible - 2 * extraVisiblePages;
        startingPage = currentPage - prevVisiblePages;
      } else {
        hasPaginationFirst = true;
        pagesArrayLength = totalAmountOfVisible - extraVisiblePages;
        startingPage = pageAmount - (extraVisiblePages + nextVisiblePages + prevVisiblePages);

      }
    }
    for (let i = 0; i < pagesArrayLength; i++) {
      const page = i + startingPage;
      paginationArray.push(<Pagination.Item active={page === currentPage} onClick={() => setCurrentPage(page)}
                                            key={'page-' + page}>{page}</Pagination.Item>)
    }
  }
  return (
    <Row className="justify-content-center">
      <Col xs={"auto"}>
        <Pagination>
          <Pagination.Prev onClick={goPrev} disabled={currentPage <= 1} />
          {hasPaginationFirst && <PaginationFirst goFirst={goFirst} currentPage={currentPage} />}
          {paginationArray}
          {hasPaginationLast && <PaginationLast goLast={goLast} currentPage={currentPage} pageAmount={pageAmount} />}
          <Pagination.Next onClick={goNext} disabled={currentPage >= pageAmount} />
        </Pagination>
      </Col>
    </Row>
  )
}

export default PaginationCustom;

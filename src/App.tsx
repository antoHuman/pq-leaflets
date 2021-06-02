import Grid from "./components/Grid";
import {Accordion, Button, Container, Card} from "react-bootstrap";
import Filters from "./components/Filters";
import {useEffect, useState} from "react";
import {TLeaflet} from "./types/leaflets.types";
import {getData} from "./services/leaflets";
import {TFiltersInfo} from "./types/filters.types";
import {TSortArray} from "./types/sorting.types";
import Sorting from "./components/Sorting";
import PaginationCustom from "./components/PaginationCustom";


function App() {
  const [leaflets, setLeaflets] = useState<TLeaflet[]>([]);
  const [filtersInfo, setFiltersInfo] = useState<TFiltersInfo>({maxDistance: '0'});
  const [sortArray, setSortArray] = useState<TSortArray>(['priority','expTimestamp','distance','retailerName','leafletName']);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageAmount, setPageAmount] = useState(1);
  useEffect(()=>{
    const valueOffset = (currentPage - 1) * 30;
    const promise = getData(filtersInfo, sortArray, valueOffset);
    promise.then((value => {
      setLeaflets(value.data.leaflets);
      const newPageAmount = Math.ceil(value.data.total / value.data.query.limit);
      setCurrentPage((prevPage) => prevPage > newPageAmount ? newPageAmount : prevPage);
      setPageAmount(newPageAmount);
    }))
  }, [filtersInfo, sortArray, currentPage])
  return (
    <div className="App">
      <Container fluid>
        <h1 className="my-3">Leaflets</h1>

        <Accordion className="mb-3">
          <Card>
            <Accordion.Toggle as={Button} variant="link" eventKey="0" className='p-0'>
              <Card.Header>
                Filters
              </Card.Header>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Filters setFiltersInfo={setFiltersInfo} filtersInfo={filtersInfo}/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Button} variant="link" eventKey="1" className='p-0'>
              <Card.Header>
                Sorting
              </Card.Header>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Sorting setSortArray={setSortArray} sortArray={sortArray}/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <PaginationCustom setCurrentPage={setCurrentPage} currentPage={currentPage} pageAmount={pageAmount}/>
        <Grid leaflets={leaflets}/>
        <PaginationCustom setCurrentPage={setCurrentPage} currentPage={currentPage} pageAmount={pageAmount}/>
      </Container>
    </div>
  );
}

export default App;

import Grid from "./components/Grid";
import {Container} from "react-bootstrap";
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
        <h1>Leaflets</h1>
        <Filters setFiltersInfo={setFiltersInfo} filtersInfo={filtersInfo} />
        <Sorting setSortArray={setSortArray} sortArray={sortArray} />
        <PaginationCustom setCurrentPage={setCurrentPage} currentPage={currentPage} pageAmount={pageAmount}/>
        <Grid leaflets={leaflets}/>
        <PaginationCustom setCurrentPage={setCurrentPage} currentPage={currentPage} pageAmount={pageAmount}/>
      </Container>
    </div>
  );
}

export default App;

import Grid from "./components/Grid";
import {Container} from "react-bootstrap";
import Filters from "./components/Filters";
import {useEffect, useState} from "react";
import {TLeaflet} from "./types/leaflets.types";
import {getLeaflets} from "./services/leaflets";
import {TFiltersInfo} from "./types/filters.types";
import {TSortArray} from "./types/sorting.types";
import Sorting from "./components/Sorting";

function App() {
  const [leaflets, setLeaflets] = useState<TLeaflet[]>([]);
  const [filtersInfo, setFiltersInfo] = useState<TFiltersInfo>({maxDistance: '0'});
  const [sortArray, setSortArray] = useState<TSortArray>(['priority','expTimestamp','distance','retailerName','leafletName']);
  useEffect(()=>{
    const promise = getLeaflets(filtersInfo, sortArray);
    promise.then((value => {
      setLeaflets(value);
    }))
  }, [filtersInfo, sortArray])
  console.log(leaflets);

  return (
    <div className="App">
      <Container fluid>
        <h1>Leaflets</h1>
        <Filters setFiltersInfo={setFiltersInfo} filtersInfo={filtersInfo} />
        <Sorting setSortArray={setSortArray} sortArray={sortArray} />
        <Grid leaflets={leaflets}/>
      </Container>
    </div>
  );
}

export default App;

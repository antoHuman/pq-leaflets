import Grid from "./components/Grid";
import {Container} from "react-bootstrap";
import Filters from "./components/Filters";
import {useEffect, useState} from "react";
import {TLeaflet} from "./types/leaflets.types";
import {getLeaflets} from "./services/leaflets";
import {TFiltersInfo} from "./types/filters.types";

function App() {
  const [leaflets, setLeaflets] = useState<TLeaflet[]>([]);
  const [filtersInfo, setFiltersInfo] = useState<TFiltersInfo>({});
  useEffect(()=>{
    const promise = getLeaflets(filtersInfo);
    promise.then((value => {
      setLeaflets(value);
    }))
  }, [filtersInfo])
  console.log(leaflets);

  return (
    <div className="App">
      <Container fluid>
        <h1>Leaflets</h1>
        <Filters filtersInfo={filtersInfo} setFiltersInfo={setFiltersInfo}/>
        <Grid leaflets={leaflets}/>
      </Container>
    </div>
  );
}

export default App;

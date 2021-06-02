import {FC, useEffect, useState} from "react";
import {getLeaflets} from "../services/leaflets";
import {TLeaflet} from "../types/leaflets.types";
import Leaflet from "./Leaflet";
import {Container, Row} from "react-bootstrap";

const Grid: FC = () => {
  const [leaflets, setLeaflets] = useState<TLeaflet[]>([]);
  useEffect(()=>{
    const promise = getLeaflets();
    promise.then((value => {
        setLeaflets(value);
    }))
  }, [])
  console.log(leaflets);
  return (
    <div className="grid">
      <Container fluid>
        <Row>
          {leaflets.map((leaflet)=> <Leaflet key={leaflet.id} leaflet={leaflet}/>)}
        </Row>
      </Container>
    </div>
  )
}

export default Grid;

import {FC} from "react";
import {TLeaflet} from "../types/leaflets.types";
import Leaflet from "./Leaflet";
import {Row} from "react-bootstrap";

const Grid: FC<{leaflets: TLeaflet[]}> = ({leaflets}) => {
  return (
    <Row className="grid">
      {leaflets.map((leaflet)=> <Leaflet key={leaflet.id} leaflet={leaflet}/>)}
    </Row>
  )
}

export default Grid;

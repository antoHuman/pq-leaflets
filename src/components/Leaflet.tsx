import {FC} from "react";
import {TLeaflet} from "../types/leaflets.types";
import {Col} from "react-bootstrap";

const Leaflet: FC<{leaflet: TLeaflet}> = ({leaflet}) => {
  return (
    <Col xs={12} md={6} lg={3} className="leaflet"><img className="leaflet__img" src={leaflet.retailer.images.lg} alt={leaflet.name} /></Col>
  );
};

export default Leaflet;

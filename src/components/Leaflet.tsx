import {FC} from "react";
import {TLeaflet} from "../types/leaflets.types";

const Leaflet: FC<{leaflet: TLeaflet}> = ({leaflet}) => {
  return (
    <div><img src={leaflet.retailer.images.lg} alt={leaflet.name} /></div>
  );
};

export default Leaflet;

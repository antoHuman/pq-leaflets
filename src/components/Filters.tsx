import {Dispatch, FC, SetStateAction} from "react";
import { Form} from "react-bootstrap";
import {TFiltersInfo} from "../types/filters.types";
import {filterExcludeExpired} from "../utils/filters.utils";

const Filters: FC<{setFiltersInfo: Dispatch<SetStateAction<TFiltersInfo>>, filtersInfo: TFiltersInfo}> = ({filtersInfo, setFiltersInfo}) => {
  const handleChange = () => {
    setFiltersInfo((oldFiltersInfo)=>{
      return {...oldFiltersInfo, excludeExpired: (filterExcludeExpired(filtersInfo)) ? '0' : '1'};
    })
  };

  return (
    <div className="filters">
      <Form inline>
        <Form.Check type="checkbox" label="Exclude expired" checked={filterExcludeExpired(filtersInfo)} onChange={handleChange}/>
      </Form>
    </div>
  )
}

export default Filters;

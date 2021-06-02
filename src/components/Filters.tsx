import {ChangeEventHandler, Dispatch, FC, SetStateAction, useState} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {TFiltersInfo} from "../types/filters.types";
import {filterExcludeExpired, getMaxDistanceFilterValue} from "../utils/filters.utils";

const Filters: FC<{setFiltersInfo: Dispatch<SetStateAction<TFiltersInfo>>, filtersInfo: TFiltersInfo}> = ({filtersInfo, setFiltersInfo}) => {
  const [maxDistanceFormValue, setMaxDistanceFormValue] = useState('');
  const [filterByDistance, setFilterByDistance] = useState(false);

  const handleExcludeExpiredChange = () => {
    setFiltersInfo((oldFiltersInfo)=>{
      return {...oldFiltersInfo, excludeExpired: (filterExcludeExpired(filtersInfo)) ? '0' : '1'};
    })
  };
  const removeMaxDistanceFilter = () => {
    setFiltersInfo((oldFiltersInfo)=>{
      // prevent additional calls if the value stay the same
      if (oldFiltersInfo.maxDistance !== '0') return {...oldFiltersInfo, maxDistance: '0'};
      return oldFiltersInfo;
    })
  }

  const handleMaxDistanceBooleanChange = () => {
    setFilterByDistance(filterByDistance => {
      const newFilterByDistance = !filterByDistance;
      handleAnyMaxDistanceChanges(maxDistanceFormValue, newFilterByDistance);
      return newFilterByDistance;
    })
  };

  const handleMaxDistanceValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setMaxDistanceFormValue(event.target.value);
    handleAnyMaxDistanceChanges(event.target.value, filterByDistance);
  };

  const handleAnyMaxDistanceChanges = (maxDistanceFormValue: string, filterByDistance: boolean) => {
    const maxDistanceFilterValue = getMaxDistanceFilterValue(maxDistanceFormValue);
    if (filterByDistance) {
      if (!isNaN(maxDistanceFilterValue)) {
        setFiltersInfo((oldFiltersInfo)=>{
          return {...oldFiltersInfo, maxDistance: maxDistanceFilterValue.toString()}
        })
      }
    } else {
      removeMaxDistanceFilter();
    }
  }


  return (
    <div className="filters">
      <Form onSubmit={event => event.preventDefault()}>
        <Form.Group className="mr-4">
          <Form.Check type="checkbox" label="Exclude expired" checked={filterExcludeExpired(filtersInfo)} onChange={handleExcludeExpiredChange}/>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Checkbox checked={filterByDistance} onChange={handleMaxDistanceBooleanChange}/>
              <InputGroup.Text>Filter by distance (km):</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="number" value={maxDistanceFormValue} onChange={handleMaxDistanceValueChange}/>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Filters;

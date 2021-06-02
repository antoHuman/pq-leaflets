import {TFiltersInfo} from "../types/filters.types";

const filterExcludeExpired = (filtersInfo: TFiltersInfo): boolean => filtersInfo.excludeExpired === '1';

const maxDistanceScale = 1000;
const getMaxDistanceFormValue = (filterValue: string): string => {
  return (parseFloat(filterValue) / maxDistanceScale).toString();
}

const getMaxDistanceFilterValue = (formValue: string): number => {
  return (parseFloat(formValue) * maxDistanceScale);
}

export {filterExcludeExpired, getMaxDistanceFilterValue, getMaxDistanceFormValue}

import {TAPIResponse, TLeaflet, TQueryParams} from "../types/leaflets.types";
import {TFiltersInfo} from "../types/filters.types";
import {TSortArray} from "../types/sorting.types";


async function getData(filtersInfo?: TFiltersInfo, sortArray?: TSortArray, valueOffset?: number): Promise<TAPIResponse> {
  const url = new URL('https://pq-leaflets.herokuapp.com/api/leaflets/filter');
  let queryParams: TQueryParams = {};
  if (sortArray) {
    queryParams.sort = sortArray.join(',');
  }
  if (filtersInfo) {
    queryParams = {...queryParams, ...filtersInfo};
  }
  if (valueOffset) {
    queryParams = {...queryParams, offset: valueOffset.toString()};

  }
  url.search = new URLSearchParams(queryParams).toString();
  console.log(url.toString())
  const response = await fetch(url.toString());
  if (response.ok) {
    const jsonValue: TAPIResponse = await response.json();
    return Promise.resolve(jsonValue);
  } else {
    return Promise.reject();
  }
}

async function getLeaflets(filtersInfo?: TFiltersInfo, sortArray?: TSortArray):  Promise<TLeaflet[]> {
  const jsonValue = await getData(filtersInfo, sortArray);
  return jsonValue.data.leaflets;
}

export {getLeaflets, getData};

import {TAPIResponse, TLeaflet} from "../types/leaflets.types";
import {TFiltersInfo} from "../types/filters.types";


async function getData(filtersInfo?: TFiltersInfo): Promise<TAPIResponse> {
  const url = new URL('https://pq-leaflets.herokuapp.com/api/leaflets/filter');
  if (filtersInfo) {
    url.search = new URLSearchParams(filtersInfo).toString();
  }
  console.log(url.toString())
  const response = await fetch(url.toString());
  if (response.ok) {
    const jsonValue: TAPIResponse = await response.json();
    return Promise.resolve(jsonValue);
  } else {
    return Promise.reject();
  }
}

async function getLeaflets(filtersInfo?: TFiltersInfo):  Promise<TLeaflet[]> {
  const jsonValue = await getData(filtersInfo);
  return jsonValue.data.leaflets;
}

export {getLeaflets, getData};

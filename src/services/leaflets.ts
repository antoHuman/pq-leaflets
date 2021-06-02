import {TAPIResponse, TLeaflet} from "../types/leaflets.types";


async function getData(): Promise<TAPIResponse> {
  const response = await fetch('https://pq-leaflets.herokuapp.com/api/leaflets/filter');
  if (response.ok) {
    const jsonValue: TAPIResponse = await response.json();
    return Promise.resolve(jsonValue);
  } else {
    return Promise.reject();
  }
}

async function getLeaflets():  Promise<TLeaflet[]> {
  const jsonValue = await getData();
  return jsonValue.data.leaflets;
}

export {getLeaflets, getData};

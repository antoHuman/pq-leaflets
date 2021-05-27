import {TAPIResponse} from "../types/leaflets.types";


async function getData() {
  const response = await fetch('https://pq-leaflets.herokuapp.com/api/leaflets/filter');
  if (response.ok) {
    const jsonValue: TAPIResponse = await response.json();
    return Promise.resolve(jsonValue);
  } else {
    return Promise.reject();
  }
}

async function getLeaflets() {
  const jsonValue = await getData();
  return jsonValue.data.leaflets;
}

export {getLeaflets, getData};

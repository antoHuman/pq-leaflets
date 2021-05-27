export type TQuery = {
  offset: number;
  limit: number;
}

export type TImages = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

export type TRetailer = {
  priority: number;
  id: string;
  name: string;
  images: TImages;
  distance: number;
}

export type TLeaflet = {
  id: string;
  name: string;
  retailer: TRetailer;
  expTimestamp: number;
}

export type TData = {
  query: TQuery;
  current: number;
  total: number;
  count: number;
  leaflets: TLeaflet[];
}

export type TAPIResponse = {
  data: TData;
  error: boolean;
}

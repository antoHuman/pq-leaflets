import {TFiltersInfo} from "../types/filters.types";

const filterExcludeExpired = (filtersInfo: TFiltersInfo): boolean => filtersInfo.excludeExpired === '1';

export {filterExcludeExpired}

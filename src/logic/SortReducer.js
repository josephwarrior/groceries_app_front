import {
  ascendingByCategory,
  descendingByCategory,
  ascendingByName,
  descendingByName,
  ascendingByRemainingStock,
  descendingByRemainingStock,
  ascendingById,
} from "./SortFunctions";

export function sortReducer(state, action) {
  if (!action) {
    return state;
  }
  let sortedArray = [];
  let payloadArray = [...action.payload] || [...state];

  switch (action.type) {
    case "ascending by category":
      sortedArray = [...payloadArray.sort(ascendingByCategory)];
      break;
    case "descending by category":
      sortedArray = [...payloadArray.sort(descendingByCategory)];
      break;
    case "ascending by item name":
      sortedArray = [...payloadArray.sort(ascendingByName)];
      break;
    case "descending by item name":
      sortedArray = [...payloadArray.sort(descendingByName)];
      break;
    case "ascending by remaining stock":
      sortedArray = [...payloadArray.sort(ascendingByRemainingStock)];
      break;
    case "descending by remaining stock":
      sortedArray = [...payloadArray.sort(descendingByRemainingStock)];
      break;
    default:
      sortedArray = [...payloadArray.sort(ascendingById)];
      break;
  }

  return sortedArray;
}

const JUST_CREATED_ITEM_TEMP_INDEX = 10000;

export const createTempNewItem = (
  itemsArray,
  orderDispatch,
  updatedItemsObject,
  setUpdatedItemsObject,
  sortby,
  filterby,
  filterFunction
) => {
  const tempNewItem = {
    id: JUST_CREATED_ITEM_TEMP_INDEX,
    category: "",
    name: "",
    stock: 0,
    target: 1,
    units: "ea",
  };
  const tempItemsArray = [...itemsArray, tempNewItem];
  orderDispatch({
    type: sortby.sortType,
    payload: filterFunction(
      JSON.parse(JSON.stringify(tempItemsArray)),
      filterby
    ),
  });
  setUpdatedItemsObject({
    ...updatedItemsObject,
    [tempNewItem.id]: tempNewItem,
  });
};

export let counter = 0;

export const incrementCounter = () => {
  counter = counter + 1;
};

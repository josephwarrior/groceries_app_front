import React, { useState, useEffect, useReducer } from "react";
import {
  getItemsFetch,
  addItemFetch,
  updateItemsFetch,
  deleteItemFetch,
} from "../logic/services";
import RemainingStock from "./RemainingStock";
import CommandButtons from "./CommandButtons";
import Page from "./Page";
import spinner from "./spinner.svg";
import { sortReducer } from "../logic/SortReducer";
import { filterFunction } from "../logic/FilterFunction";
import FilterPage from "./FilterPage";
import feedback from "../logic/feedback";
import { validateItemInputs } from "../logic/sintaxChecks";

const Content = ({ username, setMessage, logout }) => {
  let [localItemsArray, setLocalItemsArray] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [isFilterInvoked, setIsFilterInvoked] = useState(false);
  const [sortby, setSortby] = useState({ sortType: "no sort" });
  const originalFilter = {
    category: [],
    "item name": "",
    "remaining stock": [
      { range: "0% - 25%", selected: false },
      { range: "25% - 50%", selected: false },
      { range: "50% - 75%", selected: false },
      { range: "75% - 100%", selected: false },
    ],
  };
  const [filterby, setFilterby] = useState(
    JSON.parse(JSON.stringify(originalFilter))
  );
  const [isLoading, setIsLoading] = useState(true);
  let [transitoryArray, setTransitoryArray] = useState(
    JSON.parse(JSON.stringify(localItemsArray))
  );
  let [itemsArray, orderDispatch] = useReducer(
    sortReducer,
    JSON.parse(JSON.stringify(localItemsArray))
  );
  const [isContentBlocked, setIsContentBlocked] = useState(false);
  let [updatedItemsObject, setUpdatedItemsObject] = useState({});
  const JUST_CREATED_ITEM_TEMP_INDEX = 10000;

  useEffect(() => {
    getItemsFromDb();
  }, []);

  const getItemsFromDb = () => {
    getItemsFetch(username)
      .then((itemsObject) => {
        processRetrievedItemsObject(itemsObject);
      })
      .catch((error) => setMessage(feedback[error.message]));
  };

  const addNewItemToDb = (newItem) => {
    addItemFetch(newItem, username)
      .then((itemsObject) => {
        processRetrievedItemsObject(itemsObject);
      })
      .catch((error) => setMessage(feedback[error.message]));
  };

  const updateItemsAtDb = (updItemsObj) => {
    updateItemsFetch(updItemsObj, username)
      .then((itemsObject) => {
        processRetrievedItemsObject(itemsObject);
      })
      .catch((error) => setMessage(feedback[error.message]));
  };

  const deleteItemFromDb = (itemId) => {
    deleteItemFetch(itemId, username)
      .then((itemsObject) => {
        processRetrievedItemsObject(itemsObject);
      })
      .catch((error) => setMessage(feedback[error.message]));
  };

  const processRetrievedItemsObject = (retrievedItemsObject) => {
    const items = Object.values(retrievedItemsObject);
    updateAllArrays(items);
    updateFilterCategories(items);
    setIsLoading(false);
  };

  const updateFilterCategories = (incomingArray) => {
    let tempFilterby = { ...filterby };
    incomingArray.forEach((item) => {
      tempFilterby.category.some(
        (categoryItem) =>
          categoryItem.category === item.category.toLowerCase().trim()
      )
        ? (tempFilterby = { ...tempFilterby })
        : (tempFilterby = {
            ...filterby,
            category: [
              ...tempFilterby.category,
              {
                category: item.category.toLowerCase().trim(),
                selected: false,
              },
            ],
          });

      setFilterby(tempFilterby);
    });
  };

  const updateAllArrays = (incomingArray) => {
    setLocalItemsArray(JSON.parse(JSON.stringify(incomingArray)));
    setTransitoryArray(JSON.parse(JSON.stringify(incomingArray)));

    orderDispatch({
      type: sortby.sortType,
      payload: filterFunction(
        JSON.parse(JSON.stringify(incomingArray)),
        filterby
      ),
    });
  };

  function onApplySortFilter(ClickedSortType) {
    const sortType = ClickedSortType || sortby.sortType;
    orderDispatch({
      type: sortType,
      payload: filterFunction(
        JSON.parse(JSON.stringify(transitoryArray)),
        filterby
      ),
    });
  }

  const resetFilter = () => {
    const tempFilterby = { ...filterby };
    Object.keys(tempFilterby).forEach((filterType) => {
      if (Array.isArray(tempFilterby[filterType])) {
        tempFilterby[filterType].forEach((arrayItem, index) => {
          filterby[filterType][index].selected = false;
        });
      } else {
        filterby[filterType] = "";
      }
    });
    setFilterby({ ...filterby });
  };

  const resetSortBy = () => {
    sortby.sortType = "no sort";
    setSortby(sortby);
  };

  function updateArrayItem(updatedItem) {
    const attributes = Object.keys(updatedItem);
    itemsArray.forEach((iterItem, i) => {
      if (iterItem.id === updatedItem.id) {
        attributes.forEach((attribute) => {
          iterItem[attribute] = updatedItem[attribute];
        });
        setUpdatedItemsObject({
          ...updatedItemsObject,
          [updatedItem.id]: updatedItem,
        });
      }
    });
    orderDispatch({
      type: sortby.sortType,
      payload: filterFunction(JSON.parse(JSON.stringify(itemsArray)), filterby),
    });
    setTransitoryArray(JSON.parse(JSON.stringify(itemsArray)));
  }

  const reset = () => {
    resetSortBy();
    resetFilter();
    getItemsFromDb();
    setUpdatedItemsObject({});
    setIsContentBlocked(false);
    setCurrentPage("home");
    setMessage("");
  };

  const onAddClick = (e) => {
    if (currentPage === "home") {
      setIsContentBlocked(true);
      if (!e.target.className.includes("save")) {
        setCurrentPage("save");
        resetSortBy();
        resetFilter();
        createTempNewItem();
      }
    } else {
      const isInfoComplete = checkTextInputsCompleteness();
      if (!isInfoComplete) {
        return;
      }
      if (currentPage === "save") {
        const itemsArrayNewItem =
          updatedItemsObject[JUST_CREATED_ITEM_TEMP_INDEX];
        addNewItemToDb(itemsArrayNewItem);
        setIsContentBlocked(false);
      }
      if (currentPage === "update") {
        updateItemsAtDb(updatedItemsObject);
      }
      setUpdatedItemsObject({});
      setCurrentPage("home");
    }
  };

  const checkTextInputsCompleteness = () => {
    const updatedItemsArray = Object.values(updatedItemsObject);
    for (let index in updatedItemsArray) {
      let item = updatedItemsArray[index];
      item.category = item.category.trim();
      item.name = item.name.trim();
      if (!validateItemInputs(item, setMessage)) {
        return false;
      }
    }
    return true;
  };

  const createTempNewItem = () => {
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

  const deleteItem = (itemId) => {
    deleteItemFromDb(itemId);
    setMessage("");
  };

  return (
    <div>
      <div className={"content" + (isFilterInvoked ? " blurred" : "")}>
        <RemainingStock transitoryArray={transitoryArray} />
        <CommandButtons
          setIsFilterInvoked={setIsFilterInvoked}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          reset={reset}
          logout={logout}
          setMessage={setMessage}
          isContentBlocked={isContentBlocked}
        />
        {isLoading ? (
          <img alt="spinner" src={spinner} />
        ) : (
          <Page
            itemsArray={itemsArray}
            setSortby={setSortby}
            sortby={sortby}
            onApplySortFilter={onApplySortFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            updateArrayItem={updateArrayItem}
            deleteItem={deleteItem}
            isContentBlocked={isContentBlocked}
            setIsContentBlocked={setIsContentBlocked}
            localItemsArray={localItemsArray}
            setMessage={setMessage}
          />
        )}
        <div className="add-button-container">
          <button className={"add-button " + currentPage} onClick={onAddClick}>
            {currentPage !== "home" ? "SAVE" : "+"}
          </button>
        </div>
      </div>
      {isFilterInvoked && (
        <FilterPage
          setIsFilterInvoked={setIsFilterInvoked}
          itemsArray={itemsArray}
          filterby={filterby}
          setFilterby={setFilterby}
          resetFilter={resetFilter}
          onApplySortFilter={onApplySortFilter}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default Content;

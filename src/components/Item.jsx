import React, { useState, useEffect } from "react";

const Item = ({
  item,
  currentPage,
  setCurrentPage,
  updateArrayItem,
  deleteItem,
  isContentBlocked,
  setIsContentBlocked,
}) => {
  const JUST_CREATED_ITEM_TEMP_INDEX = 10000;
  const [tempItem, setTempItem] = useState(item);
  const allowedUnits = [
    "ea",
    "mL",
    "Lt",
    "oz",
    "mm",
    "cm",
    "mt",
    "ft",
    "in",
    "kg",
    "lb",
    "gr",
  ];

  useEffect(() => {
    let itemElement = document.getElementById("item" + item.id);

    if (!!itemElement && currentPage === "home") {
      itemElement.className = "item";
    }

    setTempItem(item);

    resetCheckbox();
    if (
      tempItem.id !== JUST_CREATED_ITEM_TEMP_INDEX &&
      currentPage === "save"
    ) {
      itemElement.disabled = true;
      disableInputs(true);
    } else {
      disableInputs(false);
    }

    tempItem.id === JUST_CREATED_ITEM_TEMP_INDEX &&
      !itemElement.className.includes("selected") &&
      currentPage === "save" &&
      itemElement.classList.add("selected");

    setProgressClassNames();
  }, [currentPage, item]);

  const onItemClickHandler = (e) => {
    if (
      tempItem.id !== JUST_CREATED_ITEM_TEMP_INDEX &&
      currentPage === "save"
    ) {
      e.target.disabled = true;
      disableInputs(true);
      return;
    }
    if (
      !e.currentTarget.classList.value.includes("selected") &&
      !e.target.className.includes("item-delete")
    ) {
      e.currentTarget.classList.add("selected");
    }
  };

  const onChangeCheckbox = (e) => {
    const itemElement = document.getElementById("item" + item.id);

    if (e.target.checked && !itemElement.classList.value.includes("checked")) {
      itemElement.classList.add("checked");
    }
    if (!e.target.checked && itemElement.classList.value.includes("checked")) {
      itemElement.classList.remove("checked");
    }
    disableInputs(e.target.checked);
  };

  const disableInputs = (areBeingDisabled) => {
    const textInputsNodeList = document.querySelectorAll(
      "#item" + item.id + " input[type='text']"
    );
    const textInputsArray = Array.prototype.slice.call(textInputsNodeList);

    textInputsArray.forEach((textInput) => {
      textInput.disabled = areBeingDisabled;
    });
    const selectInputNode = document.querySelector(
      "#item" + item.id + " select"
    );
    selectInputNode.disabled = areBeingDisabled;
  };

  const resetCheckbox = () => {
    const checkboxElement = document.querySelector(
      "#item" + item.id + " input[type='checkbox']"
    );
    checkboxElement.checked = false;
  };

  const onChangeHandler = (e) => {
    const helperItem = { ...item };
    switch (e.target.name) {
      case "name":
      case "category":
        helperItem[e.target.name] = e.target.value.toUpperCase();
        break;
      default:
        helperItem[e.target.name] = e.target.value;
    }
    setTempItem(helperItem);
    currentPage !== "save" && setCurrentPage("update");
    updateArrayItem(helperItem);
    const itemElement = document.getElementById("item" + item.id);

    if (!itemElement.classList.value.includes("update")) {
      itemElement.classList.add("update");
    }
  };

  const onDeleteClick = () => {
    deleteItem(tempItem.id);
    if (tempItem.id === JUST_CREATED_ITEM_TEMP_INDEX) {
      setCurrentPage("home");
      setIsContentBlocked(false);
    }
  };

  const verifyIsSelected = (e) => {
    if (e.currentTarget.classList.value.includes("selected")) {
      e.currentTarget.classList.remove("selected");
    }
  };

  const setProgressClassNames = () => {
    const itemElement = document.getElementById("item" + item.id);

    const numerator = item.stock <= item.target ? item.stock : item.target;
    const progressRatio = numerator / item.target;
    if (progressRatio <= 0.25) {
      itemElement.classList.contains("medium") &&
        itemElement.classList.remove("medium");
      itemElement.classList.contains("high") &&
        itemElement.classList.remove("high");
      itemElement.classList.add("low");
    } else if (progressRatio <= 0.5) {
      itemElement.classList.contains("low") &&
        itemElement.classList.remove("low");
      itemElement.classList.contains("high") &&
        itemElement.classList.remove("high");
      itemElement.classList.add("medium");
    } else {
      itemElement.classList.contains("low") &&
        itemElement.classList.remove("low");
      itemElement.classList.contains("medium") &&
        itemElement.classList.remove("medium");
      itemElement.classList.add("high");
    }
  };

  return (
    <li
      id={"item" + item.id}
      className="item"
      onClick={onItemClickHandler}
      onMouseLeave={(e) => verifyIsSelected(e)}
    >
      <div className="category">
        <input
          type="text"
          name="category"
          value={tempItem.category}
          onChange={onChangeHandler}
        />
      </div>
      <div className="name">
        <input
          className="item-name-input"
          type="text"
          name="name"
          value={tempItem.name}
          onChange={onChangeHandler}
        />
      </div>

      <div className="stock-remaining main">
        <div className="stock descriptive">
          <div className="stock-units">
            <input
              type="text"
              name="stock"
              value={tempItem.stock}
              onChange={onChangeHandler}
            />

            <select
              className="select-units"
              name="units"
              value={tempItem.units}
              onChange={onChangeHandler}
            >
              {allowedUnits.map((unit) => {
                return (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="target-area">
            <div>/</div>
            <input
              className="target"
              type="text"
              name="target"
              value={tempItem.target}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        <div className="stock percentage">
          {((tempItem.stock / tempItem.target) * 100).toFixed(0)}%
        </div>

        <input
          type="checkbox"
          className={
            isContentBlocked && tempItem.id !== JUST_CREATED_ITEM_TEMP_INDEX
              ? "item-checkbox hidden"
              : "item-checkbox"
          }
          onChange={onChangeCheckbox}
        />

        <div className="delete-button-area">
          <div
            type="button"
            className={
              (isContentBlocked &&
                tempItem.id !== JUST_CREATED_ITEM_TEMP_INDEX) ||
              currentPage === "update"
                ? "item-delete hidden"
                : "item-delete"
            }
            onClick={onDeleteClick}
          >
            X
          </div>
        </div>
      </div>
    </li>
  );
};

export default Item;

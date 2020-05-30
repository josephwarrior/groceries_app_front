import React from "react";

const FilterPage = ({
  setIsFilterInvoked,
  filterby,
  setFilterby,
  resetFilter,
  onApplySortFilter,
}) => {
  const categoryOnChangeHandler = (e) => {
    const tempFilterby = { ...filterby };
    tempFilterby.category.forEach((categoryItem) => {
      categoryItem.category.toLowerCase() === e.target.value.toLowerCase() &&
        (categoryItem.selected = !categoryItem.selected);
    });

    setFilterby(tempFilterby);
  };

  const onItemnameChangeHandler = (e) => {
    setFilterby({ ...filterby, "item name": e.target.value });
    handleItemnameClearVisibility(e.target.value === "");
  };

  const onItemnameClearClick = () => {
    setFilterby({ ...filterby, "item name": "" });
    handleItemnameClearVisibility(true);
  };

  const handleItemnameClearVisibility = (isTextinputEmpty) => {
    const nameClearElement = document.getElementById("filter-itemname-clear");
    if (!isTextinputEmpty && nameClearElement.classList.contains("hidden")) {
      nameClearElement.classList.remove("hidden");
    }
    if (isTextinputEmpty && !nameClearElement.classList.contains("hidden")) {
      nameClearElement.classList.add("hidden");
    }
  };

  const stockOnChangeHandler = (e) => {
    const tempFilterby = { ...filterby };
    tempFilterby["remaining stock"].forEach((stockItem) => {
      stockItem.range.toLowerCase().trim() ===
        e.target.value.toLowerCase().trim() &&
        (stockItem.selected = !stockItem.selected);
    });
    setFilterby(tempFilterby);
  };

  const onApplyClickHandler = (e) => {
    e.preventDefault();
    setIsFilterInvoked(false);
    onApplySortFilter();
  };

  const onClearClickHandler = (e) => {
    e.preventDefault();
    resetFilter();
  };

  return (
    <div className="filter-page">
      <div className="filter-category-area">
        <h3>CATEGORIES</h3>
        <form id="filter-form">
          {filterby.category.map((filterCategory, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={"category" + index}
                  name="category"
                  value={filterCategory.category}
                  onChange={categoryOnChangeHandler}
                  checked={filterCategory.selected}
                />
                <label htmlFor={"category" + index}>
                  {filterCategory.category}
                </label>
              </div>
            );
          })}
        </form>
      </div>
      <div className="filter-item-name-area">
        <label htmlFor="item-name">
          <h3>ITEM NAME</h3>
        </label>
        <input
          id="item-name"
          name="item name"
          type="text"
          placeholder="Enter complete or partial item name here ..."
          form="filter-form"
          onChange={onItemnameChangeHandler}
          value={filterby["item name"]}
        />
        <div
          id="filter-itemname-clear"
          className="itemname-clear hidden"
          onClick={onItemnameClearClick}
        >
          x
        </div>
      </div>
      <div className="filter-remaining-stock-area">
        <h3>STOCK REMAINING</h3>

        {filterby["remaining stock"].map((filterItem) => {
          return (
            <div key={filterItem.range}>
              <input
                type="checkbox"
                id={filterItem.range}
                name="stock remaining"
                value={filterItem.range}
                onChange={stockOnChangeHandler}
                checked={filterItem.selected}
              />
              <label htmlFor="q1">{filterItem.range}</label>
            </div>
          );
        })}
      </div>
      <div className="filter-button-area">
        <input
          type="submit"
          className="filter-apply-button"
          onClick={onApplyClickHandler}
          form="filter-form"
          value="Apply"
        />
        <input
          type="button"
          className="filter-clear-button"
          onClick={onClearClickHandler}
          form="filter-form"
          value="Clear"
        />
      </div>
    </div>
  );
};

export default FilterPage;

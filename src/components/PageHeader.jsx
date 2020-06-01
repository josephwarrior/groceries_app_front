import React, { useState, useEffect } from "react";
import feedback from "../logic/feedback";

const PageHeader = ({
  headerTitle,
  setSortby,
  sortby,
  onApplySortFilter,
  setMessage,
  isContentBlocked,
}) => {
  const typeArray = ["no sort", "ascending", "descending"];
  const icon = ["", <p>&#9650;</p>, <p>&#9660;</p>];
  const [typeIndex, setTypeIndex] = useState(0);

  const orderList = () => {
    if (isContentBlocked) {
      setMessage(feedback["CONTENT_BLOCKED"]);
      return;
    }
    const newIndex = (typeIndex + 1) % 3;
    const sortType = typeArray[newIndex] + " by " + headerTitle.toLowerCase();

    setTypeIndex(newIndex);
    setSortby({ sortType });
    onApplySortFilter(sortType);
  };

  const selectedSortIcon = sortby.sortType.includes(headerTitle.toLowerCase())
    ? icon[typeIndex]
    : "";
  useEffect(() => {
    !sortby.sortType.includes(headerTitle.toLowerCase()) && setTypeIndex(0);
  }, [typeIndex, headerTitle, sortby]);
  return (
    <div
      className={"page-header " + headerTitle.toLowerCase().replace(" ", "-")}
      onClick={orderList}
    >
      <div className="page-header-title">{headerTitle}</div>
      <div className="page-header-order-icon">{selectedSortIcon}</div>
    </div>
  );
};

export default PageHeader;

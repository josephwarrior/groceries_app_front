import React from "react";
import PageHeader from "./PageHeader";

const PageHeadersArea = ({
  setSortby,
  sortby,
  onApplySortFilter,
  currentPage,
  setMessage,
  isContentBlocked,
}) => {
  const mainPageHeader = (
    <div className="page-headers-area">
      <PageHeader
        headerTitle={"CATEGORY"}
        setSortby={setSortby}
        sortby={sortby}
        onApplySortFilter={onApplySortFilter}
        setMessage={setMessage}
        isContentBlocked={isContentBlocked}
      />
      <PageHeader
        headerTitle={"ITEM NAME"}
        setSortby={setSortby}
        sortby={sortby}
        onApplySortFilter={onApplySortFilter}
        setMessage={setMessage}
        isContentBlocked={isContentBlocked}
      />
      <PageHeader
        headerTitle={"REMAINING STOCK"}
        setSortby={setSortby}
        sortby={sortby}
        onApplySortFilter={onApplySortFilter}
        setMessage={setMessage}
        isContentBlocked={isContentBlocked}
      />
    </div>
  );

  const shoppingListHeader = (
    <div className="page-headers-area">
      <div className="shopping-list-title">SHOPPING LIST</div>
      <div className="tobuy-title">QUANTITY TO BUY</div>
    </div>
  );
  switch (currentPage) {
    case "main":
      return mainPageHeader;
    case "shopping":
      return shoppingListHeader;
    default:
      return mainPageHeader;
  }
};

export default PageHeadersArea;

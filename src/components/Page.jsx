import React from "react";
import PageBody from "./PageBody";
import PageHeadersArea from "./PageHeadersArea";

const Page = ({
  itemsArray,
  setSortby,
  sortby,
  onApplySortFilter,
  currentPage,
  setCurrentPage,
  updateArrayItem,
  deleteItem,
  isContentBlocked,
  setIsContentBlocked,
  localItemsArray,
  setMessage,
}) => {
  return (
    <div className="page">
      <PageHeadersArea
        setSortby={setSortby}
        sortby={sortby}
        onApplySortFilter={onApplySortFilter}
        currentPage={currentPage}
        setMessage={setMessage}
        isContentBlocked={isContentBlocked}
      />
      <PageBody
        itemsArray={itemsArray}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        updateArrayItem={updateArrayItem}
        deleteItem={deleteItem}
        isContentBlocked={isContentBlocked}
        setIsContentBlocked={setIsContentBlocked}
        localItemsArray={localItemsArray}
        setMessage={setMessage}
      />
    </div>
  );
};

export default Page;

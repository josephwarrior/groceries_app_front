import React, { useEffect } from "react";
import Item from "./Item";

const PageBody = ({
  itemsArray,
  currentPage,
  setCurrentPage,
  updateArrayItem,
  deleteItem,
  isContentBlocked,
  setIsContentBlocked,
  setMessage,
}) => {
  useEffect(() => {
    const JUST_CREATED_ITEM_TEMP_INDEX = 10000;
    const itemElement = document.getElementById(
      "item" + JUST_CREATED_ITEM_TEMP_INDEX
    );
    if (!!itemElement) {
      const scrollDistance = itemElement.offsetTop;
      document.querySelector(".page-body").scrollTop = scrollDistance;
    }
  }, [itemsArray]);

  return (
    <div className="page-body">
      <ul className={"list " + currentPage}>
        {itemsArray.map((item) => {
          return (
            <div className="item-container" key={item.id}>
              <Item
                item={item}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                updateArrayItem={updateArrayItem}
                deleteItem={deleteItem}
                isContentBlocked={isContentBlocked}
                setIsContentBlocked={setIsContentBlocked}
                setMessage={setMessage}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default PageBody;

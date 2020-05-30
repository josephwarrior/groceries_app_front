export function filterFunction(array, filterby) {
  let isFilteredByCategory = false;
  let newArray = [];
  if (filterby.category.length > 0) {
    filterby.category.forEach((categorySelection) => {
      categorySelection.selected && (isFilteredByCategory = true);
      newArray = [
        ...newArray,
        ...array.filter((item) => {
          return (
            item.category.toLowerCase().trim() ===
              categorySelection.category.toLowerCase().trim() &&
            categorySelection.selected
          );
        }),
      ];
    });
  }

  !isFilteredByCategory && (newArray = [...array]);

  if (filterby["item name"].trim().length > 0) {
    newArray = [...newArray].filter((item) => {
      return item.name
        .toLowerCase()
        .trim()
        .includes(filterby["item name"].toLowerCase().trim());
    });
  }

  let isFilteredByStock = false;
  let finalArray = [];
  filterby["remaining stock"].forEach((remStockSelection) => {
    remStockSelection.selected && (isFilteredByStock = true);

    finalArray = [
      ...finalArray,
      ...newArray.filter((item) => {
        let lowerLimit = Number(
          remStockSelection.range
            .split("-")[0]
            .trim()
            .slice(0, remStockSelection.range.split("-")[0].trim().length - 1)
        );
        lowerLimit = lowerLimit === 0 ? -0.00000001 : lowerLimit;
        const upperLimit = Number(
          remStockSelection.range
            .split("-")[1]
            .trim()
            .slice(0, remStockSelection.range.split("-")[1].trim().length - 1)
        );
        const remainingStockPercentage = (item.stock / item.target) * 100;
        return (
          remainingStockPercentage > lowerLimit &&
          remainingStockPercentage <= upperLimit &&
          remStockSelection.selected
        );
      }),
    ];
  });

  return isFilteredByStock ? finalArray : newArray;
}

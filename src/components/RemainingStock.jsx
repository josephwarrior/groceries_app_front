import React, { useEffect, useState } from "react";

const RemainingStock = ({ transitoryArray }) => {
  const [currentStock, setCurrentStock] = useState(0);

  useEffect(() => {
    let sum = 0;
    let count = 0;
    transitoryArray.forEach((item) => {
      const numerator = item.stock <= item.target ? item.stock : item.target;
      sum += numerator / item.target;
      count++;
    });
    const newBarLengthRatio = sum / count;
    setBarLength(newBarLengthRatio);
    setCurrentStock((newBarLengthRatio * 100).toFixed(0));
  }, [transitoryArray]);

  const setBarLength = (barLengthRatio) => {
    const svgElement = document.getElementById("bar-frame");
    const svgLength = Number(svgElement.attributes.width.value);
    let newBarLength = svgLength * barLengthRatio;
    newBarLength = !!newBarLength ? newBarLength : 0;
    const barElement = document.getElementById("bar");
    barElement.attributes.width.value = newBarLength.toString() || "0";
    barElement.classList.forEach((clname) =>
      barElement.classList.remove(clname)
    );
    svgElement.classList.forEach((clname) =>
      svgElement.classList.remove(clname)
    );
    if (barLengthRatio <= 0.25) {
      barElement.classList.add("low");
      svgElement.classList.add("low");
    } else if (barLengthRatio <= 0.5) {
      barElement.classList.add("medium");
      svgElement.classList.add("medium");
    } else {
      barElement.classList.add("high");
      svgElement.classList.add("high");
    }
  };

  return (
    <div className="progress-bar">
      <svg id="bar-frame" width="200">
        <rect id="bar" width="0" height="60" className="high" />
      </svg>
      <div id="progress-bar-label">{currentStock} %</div>
    </div>
  );
};

export default RemainingStock;

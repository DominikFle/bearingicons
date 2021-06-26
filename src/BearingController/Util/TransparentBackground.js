import React, { useMemo } from "react";

export function TransparentBackground({ width, height, nGrid }) {
  const increment = Math.max(width, height) / nGrid;
  const black = "rgba(0,0,0,0.1)";
  const white = "rgba(255,255,255,1)";
  const rectangleList = useMemo(() => {
    let rectList = [];
    for (let i = 0; i < nGrid; i++) {
      for (let j = 0; j < nGrid; j++) {
        const x = i * increment;
        const y = j * increment;
        const color = (isEven(j) && isEven(i)) || (!isEven(j) && !isEven(i)) ? white : black;
        rectList.push(<rect key={`${i} ${j}`} x={x} y={y} width={increment} height={increment} fill={color}></rect>);
      }
    }
    console.log("got rendeered");
    return rectList;
  }, [increment]);

  return <>{rectangleList}</>;
}

function isEven(number) {
  return !(number % 2);
}

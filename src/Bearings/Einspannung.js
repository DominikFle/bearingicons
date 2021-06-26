import React from "react";
import { deg2Rad } from "util/angleConversion";

export function Einspannung({
  x = 0,
  y = 0,
  hatchAngle = 60,
  strokeWidth = 3,
  strokeColor = "black",
  width = 100,
  height = 20,
  angle = 0,
  groupRef,
  xCenter = 0,
  yCenter = 0,
}) {
  //   const x = 0;
  //   const y = 0;

  const numberOfHatches = Math.floor(width / height) >= 1 ? Math.floor(width / height) : 1;

  const hatchWidth = height / Math.tan(deg2Rad(hatchAngle));
  const borderLength = width - numberOfHatches * height - (height - hatchWidth);
  const xHatchPositions = [];
  for (var i = 1; i <= numberOfHatches; i++) {
    const xPos = borderLength / 2 + height * i;
    xHatchPositions.push(xPos);
  }
  const hatchLines = xHatchPositions.map((xHatchPos, index) => {
    return (
      <line
        id={"Line" + index}
        x1={xHatchPos}
        y1={0}
        x2={xHatchPos - hatchWidth}
        y2={height}
        stroke={strokeColor}
        strokeWidth={(strokeWidth * 3) / 4}
        key={xHatchPos}
        strokeLinecap="round"
      />
    );
  });
  // const xCenter = width / 2;
  // const yCenter = strokeWidth / 2;

  return (
    <g ref={groupRef} id="Einspannung" transform={`translate(${x},${y})  rotate(${angle} ${xCenter} ${yCenter} )`}>
      <polygon
        id="hoverHelper"
        points={"0,0 0," + height + " " + width + "," + height + " " + width + ",0"}
        fill="rgba(0,0,0,0)"
      />

      <g id="bottom">
        <line
          id="BaseLine"
          x1="0"
          y1={0}
          x2={width}
          y2={0}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {hatchLines}
      </g>
      {/* <circle id="refPoint" cx="350" cy="0" r="10" fill="red" /> */}
    </g>
  );
}

import React from "react";
import { deg2Rad } from "util/angleConversion";

export function FestLager({
  x = 0,
  y = 0,
  xCenter = 0,
  yCenter = 0,
  hatchAngle = 60,
  strokeWidth = 3,
  strokeColor = "black",
  width = 100,
  height = 20,
  angle = 0,
  dJoint = 30,
  hJointToBase = 50,
  tFactor = 50,
  groupRef,
  drawHatching = true,
  jointFillColor = "white",
  bodyColor = "white",
  showOnlyJoint = false,
}) {
  tFactor = tFactor / 100;

  const numberOfHatches = Math.floor(width / height) >= 1 ? Math.floor(width / height) : 1;
  const hToBaseLine = hJointToBase + dJoint / 2;
  const hatchWidth = height / Math.tan(deg2Rad(hatchAngle));
  const borderLength = width - numberOfHatches * height - (height - hatchWidth);
  const xHatchPositions = [];
  for (var i = 1; i <= numberOfHatches; i++) {
    const xPos = borderLength / 2 + height * i;
    xHatchPositions.push(xPos);
  }
  const hatchLines = drawHatching
    ? xHatchPositions.map((xHatchPos, index) => {
        return (
          <line
            id={"Line" + index}
            x1={xHatchPos}
            y1={hToBaseLine}
            x2={xHatchPos - hatchWidth}
            y2={height + hToBaseLine}
            stroke={strokeColor}
            strokeWidth={(strokeWidth * 3) / 4}
            key={xHatchPos}
            strokeLinecap="round"
          />
        );
      })
    : "";

  const xJoint = width / 2;
  const yJoint = dJoint / 2;
  const xLeftLineTop = xJoint - (tFactor * dJoint) / 2;
  const yLeftLineTop = yJoint + dJoint / 2 - (tFactor * dJoint) / 2;
  const xLeftLineBottom = (width - 0.8 * width) / 2;

  const xRightLineTop = xJoint + (tFactor * dJoint) / 2;
  const yRightLineTop = yJoint + dJoint / 2 - (tFactor * dJoint) / 2;
  const xRightLineBottom = (width - 0.8 * width) / 2 + 0.8 * width;

  // const xCenter = width / 2;
  // const yCenter = strokeWidth / 2;

  return (
    <g ref={groupRef} id="FestLager" transform={`translate(${x},${y})  rotate(${angle} ${xCenter} ${yCenter} )`}>
      <polygon
        id="hoverHelper"
        points={"0,0 0," + height + " " + width + "," + height + " " + width + ",0"}
        fill="rgba(0,0,0,0)"
      />
      {!showOnlyJoint ? (
        <g id="everthingButJoint">
          <polygon
            points={`${xLeftLineBottom},${hToBaseLine} ${xLeftLineTop},${yLeftLineTop} 
        ${xRightLineTop},${yRightLineTop} ${xRightLineBottom},${hToBaseLine} `}
            fill={bodyColor}
            strokeLinecap="round"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />

          <g id="bottom">
            <line
              id="BaseLine"
              x1="0"
              y1={hToBaseLine}
              x2={width}
              y2={hToBaseLine}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            {hatchLines}
          </g>
          <circle
            id="Joint"
            cx={xJoint}
            cy={yJoint}
            r={dJoint / 2}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill={jointFillColor}
          />
        </g>
      ) : (
        <circle
          id="Joint"
          cx={xJoint}
          cy={yJoint}
          r={dJoint / 2}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill={jointFillColor}
        />
      )}
    </g>
  );
}

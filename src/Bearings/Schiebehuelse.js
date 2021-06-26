import React from "react";
import { deg2Rad } from "util/angleConversion";

export function Schiebehuelse({
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
  dBall = 15,
  drawBalls = true,
  drawTopHatch = true,
  drawBottomHatch = true,
  groupRef,
  ballsColor = "white",
}) {
  const numberOfHatches = Math.floor(width / height) >= 1 ? Math.floor(width / height) : 1;
  const hToBaseLine = drawTopHatch ? height + dBall + strokeWidth : 0;
  const hatchWidth = height / Math.tan(deg2Rad(hatchAngle));
  const borderLength = width - numberOfHatches * height - (height - hatchWidth);
  const xHatchPositions = [];
  const xHatchPositionsTop = [];
  for (var i = 1; i <= numberOfHatches; i++) {
    const xPos = borderLength / 2 + height * i;
    xHatchPositions.push(xPos);
    const xPosTop = width - (borderLength / 2 + height * i);
    xHatchPositionsTop.push(xPosTop);
  }
  const hatchLines = xHatchPositions.map((xHatchPos, index) => {
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
  });

  const numberOfBalls = Math.floor(width / 1.1 / (dBall + strokeWidth));
  const startOfTopHorizontal = 0;
  const xBallPositions = [];
  for (var j = 0; j < numberOfBalls; j++) {
    const xBall = startOfTopHorizontal + width / numberOfBalls / 2 + j * (width / numberOfBalls);
    xBallPositions.push(xBall);
  }
  const yBalls = hToBaseLine - dBall / 2 - strokeWidth / 2;
  const balls = xBallPositions.map((xBallPos, index) => {
    return (
      <circle
        key={xBallPos}
        cx={xBallPos}
        cy={yBalls}
        r={dBall / 2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={ballsColor}
      />
    );
  });

  const yTopHorizontal = yBalls - dBall / 2 - strokeWidth / 2;
  const hatchLinesTop = xHatchPositionsTop.map((xHatchPos, index) => {
    return (
      <line
        id={"LineTop" + index}
        x1={xHatchPos}
        y1={yTopHorizontal}
        x2={xHatchPos + hatchWidth}
        y2={0}
        stroke={strokeColor}
        strokeWidth={(strokeWidth * 3) / 4}
        key={xHatchPos + "Top"}
        strokeLinecap="round"
      />
    );
  });

  // const xCenter = width / 2;
  // const yCenter = strokeWidth / 2;

  return (
    <g ref={groupRef} id="Schiebehuelse" transform={`translate(${x},${y})  rotate(${angle} ${xCenter} ${yCenter} )`}>
      <polygon
        id="hoverHelper"
        points={"0,0 0," + height + " " + width + "," + height + " " + width + ",0"}
        fill="rgba(0,0,0,0)"
      />

      <line
        id="TopHorizontal"
        x1={startOfTopHorizontal}
        x2={startOfTopHorizontal + width}
        y1={yTopHorizontal}
        y2={yTopHorizontal}
        strokeLinecap="round"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />

      <g id="balls">{drawBalls ? balls : ""}</g>
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
        {drawBottomHatch ? hatchLines : ""}
        {drawTopHatch ? hatchLinesTop : ""}
      </g>
      {/* <circle id="refPoint" cx="350" cy="0" r="10" fill="red" /> */}
    </g>
  );
}

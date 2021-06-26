import React from "react";
import { deg2Rad } from "util/angleConversion";

export function LosLager({
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
  wBalls = 80,
  dBall = 15,
  drawBalls = true,
  drawHatching = true,
  tFactor = 50,
  groupRef,
  jointFillColor = "white",
  bodyColor = "white",
  ballsColor = "white",
}) {
  tFactor = tFactor / 100;

  const numberOfHatches = Math.floor(width / height) >= 1 ? Math.floor(width / height) : 1;
  const hToBaseLine = hJointToBase + dJoint / 2 + dBall;
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
  const numberOfBalls = Math.floor(wBalls / 1.1 / (dBall + strokeWidth));
  const startOfTopHorizontal = (width - wBalls) / 2;
  const xBallPositions = [];
  for (var j = 0; j < numberOfBalls; j++) {
    const xBall = startOfTopHorizontal + wBalls / numberOfBalls / 2 + j * (wBalls / numberOfBalls);
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
  const xJoint = width / 2;
  const yJoint = dJoint / 2;
  const xLeftLineTop = xJoint - (tFactor * dJoint) / 2;
  const yLeftLineTop = yJoint + dJoint / 2 - (tFactor * dJoint) / 2;
  const xLeftLineBottom = (width - 0.8 * wBalls) / 2;

  const xRightLineTop = xJoint + (tFactor * dJoint) / 2;
  const yRightLineTop = yJoint + dJoint / 2 - (tFactor * dJoint) / 2;
  const xRightLineBottom = (width - 0.8 * wBalls) / 2 + 0.8 * wBalls;

  return (
    <g ref={groupRef} id="LosLager" transform={`translate(${x},${y})  rotate(${angle} ${xCenter} ${yCenter} )`}>
      <polygon
        id="hoverHelper"
        points={"0,0 0," + height + " " + width + "," + height + " " + width + ",0"}
        fill="rgba(0,0,0,0)"
      />

      <line
        id="TopHorizontal"
        x1={startOfTopHorizontal}
        x2={startOfTopHorizontal + wBalls}
        y1={yTopHorizontal}
        y2={yTopHorizontal}
        strokeLinecap="round"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <polygon
        points={`${xLeftLineBottom},${yTopHorizontal} ${xLeftLineTop},${yLeftLineTop} 
        ${xRightLineTop},${yRightLineTop} ${xRightLineBottom},${yTopHorizontal} `}
        strokeLinecap="round"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={bodyColor}
      />
      {/* <line
        id="LeftLine"
        x1={xLeftLineBottom}
        x2={xLeftLineTop}
        y1={yTopHorizontal}
        y2={yLeftLineTop}
        strokeLinecap="round"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <line
        id="RightLine"
        x1={xRightLineBottom}
        x2={xRightLineTop}
        y1={yTopHorizontal}
        y2={yRightLineTop}
        strokeLinecap="round"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      /> */}
      <circle
        id="Joint"
        cx={xJoint}
        cy={yJoint}
        r={dJoint / 2}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={jointFillColor}
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
        {drawHatching ? hatchLines : ""}
      </g>
      {/* <circle id="refPoint" cx="350" cy="0" r="10" fill="red" /> */}
    </g>
  );
}

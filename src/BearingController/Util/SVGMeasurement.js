import React from "react";

export function SVGMeasurement({
  posXInnerSvg,
  posYInnerSvg,
  svgWidth,
  svgHeight,
  zoomFactor,
  color = "black",
  strokeWidth = 1,
}) {
  const distToFrame = 40;
  const xStartHorizontal = posXInnerSvg;
  const xEndHorizontal = xStartHorizontal + svgWidth * zoomFactor;
  const yHorizontal = posYInnerSvg - distToFrame;

  const yStartVertical = posYInnerSvg;
  const yEndVertical = yStartVertical + svgHeight * zoomFactor;
  const xVertical = xEndHorizontal + distToFrame;

  const x1 = xStartHorizontal;
  const x2 = xEndHorizontal;
  const x3 = x2;
  const y1 = yStartVertical;
  const y2 = yStartVertical;
  const y3 = yEndVertical;
  const xTextWidth = (x1 + x2) / 2;
  const yTextWidth = y1 - distToFrame * 1.3;
  const xTextHeight = x2 + distToFrame * 1.3;
  const yTextHeight = (y2 + y3) / 2;

  const textLength = 25;
  return (
    <>
      <g id="width">
        <text x={xTextWidth - textLength / 2} y={yTextWidth} textLength={textLength}>
          {Math.round(svgWidth)}
        </text>
        <line
          id="leftMeasure"
          x1={x1}
          y1={y1}
          x2={x1}
          y2={y1 - distToFrame * 1.3}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <line
          id="rightMeasure"
          x1={x2}
          y1={y2}
          x2={x2}
          y2={y2 - distToFrame * 1.3}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <line
          id="horizontal"
          x1={xStartHorizontal}
          y1={yHorizontal}
          x2={xEndHorizontal}
          y2={yHorizontal}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </g>
      <g id="height">
        <text x={xTextHeight} y={yTextHeight} textLength={textLength}>
          {Math.round(svgHeight)}
        </text>
        <line
          id="leftMeasure"
          x1={x2}
          y1={y2}
          x2={x2 + distToFrame * 1.3}
          y2={y2}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <line
          id="rightMeasure"
          x1={x3}
          y1={y3}
          x2={x3 + distToFrame * 1.3}
          y2={y3}
          stroke={color}
          strokeWidth={strokeWidth}
        />
        <line
          id="vertical"
          x1={xVertical}
          y1={yStartVertical}
          x2={xVertical}
          y2={yEndVertical}
          stroke={color}
          strokeWidth={strokeWidth}
        />
      </g>
    </>
  );
}

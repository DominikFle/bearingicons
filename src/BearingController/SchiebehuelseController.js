import { Button, colors, Paper, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import React, { useEffect, useRef, useState } from "react";
import { saveSvg } from "util/saveSVG";
import { SliderInput } from "./Util/SliderInput";
import { useRect } from "../Hooks/useRect";
import { useBBox } from "Hooks/useBBox";
import { CheckInput } from "./Util/CheckInput";
import GetAppIcon from "@material-ui/icons/GetApp";
import ColorModal from "./Util/ColorModal";
import { useZoom } from "Hooks/useZoom";
import { SVGMeasurement } from "./Util/SVGMeasurement";

import { Schiebehuelse } from "Bearings/Schiebehuelse";
import { ControlTabs } from "./Util/ControlTabs";

const useStyles = makeStyles((theme) => ({
  wrapp: {
    height: "calc(100% )",

    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  leftSide: {
    position: "relative",
    width: "70%",
    height: "100%",
    // border: "1px solid black",
    backgroundImage: 'url("transi.png")',
    backgroundRepeat: "repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  svg: {
    outline: " 1px solid blue",
  },
  svgWrapper: {
    border: "1px solid ",
  },
  rightSide: {
    width: "30%",
    borderLeft: "1px solid black",
  },
  download: {
    position: "absolute",
    right: "30x",
    bottom: "20px",
    margin: "8px",
    background: "darkBlue",
    color: "white",
    "&:hover": {
      background: "blue",
    },
  },

  panelBody: {
    width: "100%",
  },
}));

export function SchiebehuelseController({
  inWidth,
  inHeight,
  inHatchAngle,
  inStrokeWidth,
  inBallsColor,
  inStrokeColor,
  inDBalls,
  inDrawBalls,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [angle, setAngle] = useState(0);
  const [width, setWidth] = useState(inWidth);
  const [height, setHeight] = useState(inHeight);
  const [hatchAngle, setHatchAngle] = useState(inHatchAngle);
  const [strokeWidth, setStrokeWidth] = useState(inStrokeWidth);

  const [dBall, setDBall] = useState(inDBalls);
  const [drawBalls, setDrawBalls] = useState(inDrawBalls);
  const [drawHatching, setDrawHatching] = useState(true);
  const [drawHatchingTop, setDrawHatchingTop] = useState(true);

  const [strokeColor, setStrokeColor] = useState(inStrokeColor);

  const [ballsColor, setBallsColor] = useState(inBallsColor);

  const [isInSliderView, setIsInSliderView] = useState(true);

  const handleStrokeChange = (value, event) => {
    const color = `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`;
    setStrokeColor(color);
  };

  const handleBallsChange = (value, event) => {
    const color = `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`;
    setBallsColor(color);
  };
  const svg = useRef();
  const leftSide = useRef();
  const leftRect = useRect(leftSide);
  const losLagerGroup = useRef();
  const losLagerGroupBox = useBBox(losLagerGroup);
  const zoomFactor = useZoom(0.2, 3);
  const sliderInputs = [
    // {
    //   name: "Width",
    //   value: width,
    //   min: 0,
    //   max: 1000,
    //   updateFunc: setWidth,
    // },
    {
      name: "Height Hatching",
      value: height,
      min: 2,
      max: width,
      updateFunc: setHeight,
    },
    {
      name: "Angle",
      value: angle,
      min: 0,
      max: 360,
      updateFunc: setAngle,
    },

    {
      name: "Diameter Balls",
      value: dBall,
      min: 2,
      max: width / 2.5,
      updateFunc: setDBall,
    },

    {
      name: "Angle of Hatching",
      value: hatchAngle,
      min: 45,
      max: 135,
      updateFunc: setHatchAngle,
    },
    {
      name: "StrokeWidth",
      value: strokeWidth,
      min: 1,
      max: 12,
      updateFunc: setStrokeWidth,
    },
  ];
  const checkInputs = [
    {
      name: "Show Balls",
      value: drawBalls,
      updateFunc: setDrawBalls,
    },
    {
      name: "Show Hatching Bottom",
      value: drawHatching,
      updateFunc: setDrawHatching,
    },
    {
      name: "Show Hatching Top",
      value: drawHatchingTop,
      updateFunc: setDrawHatchingTop,
    },
  ];
  const checkInputsComps = checkInputs.map((obj, index) => {
    return <CheckInput color="primary" key={obj.name} name={obj.name} value={obj.value} updateFunc={obj.updateFunc} />;
  });
  const inputSliders = sliderInputs.map((obj, index) => {
    return (
      <SliderInput
        key={obj.name}
        max={obj.max}
        min={obj.min}
        value={obj.value}
        name={obj.name}
        updateFunc={obj.updateFunc}
      />
    );
  });
  const colorView = (
    <>
      <ColorModal name="Stroke Color" color={strokeColor} updateColor={handleStrokeChange} />

      <ColorModal name="Bearing Balls Color" color={ballsColor} updateColor={handleBallsChange} />
      {checkInputsComps}
    </>
  );

  const pythiLength = Math.sqrt(
    losLagerGroupBox.width * losLagerGroupBox.width + losLagerGroupBox.height * losLagerGroupBox.height
  );
  const svgWidth = pythiLength * 1.1; // leftBox.width * 0.8;
  const svgHeight = pythiLength * 1.1; // leftBox.width * 0.8;
  const posXInnerSvg = (leftRect.width - zoomFactor * svgWidth) / 2;
  const posYInnerSvg = (leftRect.height - zoomFactor * svgHeight) / 2;
  return (
    <header className={classes.wrapp}>
      <div className={`${classes.leftSide} svgBack`} ref={leftSide}>
        <svg
          id="wrapperSvg"
          width={leftRect.width}
          height={leftRect.height}
          viewBox={`0 0 ${leftRect.width} ${leftRect.height}`}
          className={classes.svgWrapper}
        >
          {/* <TransparentBackground width={leftRect.width} height={leftRect.height} nGrid={50} /> */}
          <SVGMeasurement
            posXInnerSvg={posXInnerSvg}
            posYInnerSvg={posYInnerSvg}
            svgWidth={svgWidth}
            svgHeight={svgHeight}
            zoomFactor={zoomFactor}
          />
          <g transform={`  translate( ${posXInnerSvg} ${posYInnerSvg}) scale(${zoomFactor}) `}>
            <svg
              className={classes.svg}
              ref={svg}
              id="playground"
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            >
              <Schiebehuelse
                groupRef={losLagerGroup}
                x={(svgWidth - losLagerGroupBox.width) / 2}
                y={(svgHeight - losLagerGroupBox.height) / 2}
                strokeWidth={strokeWidth}
                hatchAngle={hatchAngle}
                xCenter={losLagerGroupBox.width / 2}
                yCenter={losLagerGroupBox.height / 2}
                width={width}
                angle={angle}
                height={height}
                dBall={dBall}
                drawBalls={drawBalls}
                drawBottomHatch={drawHatching}
                drawTopHatch={drawHatchingTop}
                strokeColor={strokeColor}
                ballsColor={ballsColor}
              />
            </svg>
          </g>
        </svg>

        <Button
          className={classes.download}
          onClick={() => {
            //https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
            saveSvg(svg.current, "test.svg");
          }}
        >
          <GetAppIcon width={70} height={70}></GetAppIcon>
          <Typography>Download SVG</Typography>
        </Button>
      </div>
      <div className={classes.rightSide}>
        <ControlTabs
          isInSliderView={isInSliderView}
          setIsInSliderView={setIsInSliderView}
          color={theme.palette.primary.main}
          name1={"Size"}
          name2={"Color"}
        />
        <div className={classes.panelBody}>{isInSliderView ? inputSliders : colorView}</div>
      </div>
    </header>
  );
}

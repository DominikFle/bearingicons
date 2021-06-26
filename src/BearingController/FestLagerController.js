import { Button, colors, Paper, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { LosLager } from "Bearings/LosLager";
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
import { TransparentBackground } from "./Util/TransparentBackground";
import { FestLager } from "Bearings/FestLager";
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
    outline: " 1px solid " + theme.palette.primary.main,
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

export function FestLagerController({
  inWidth,
  inHeight,
  inHatchAngle,
  inStrokeWidth,
  inDJoint,
  inHJointToBase,
  inTFactor,
  inStrokeColor,
  inJointFillColor,
  inBodyColor,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [angle, setAngle] = useState(0);
  const [width, setWidth] = useState(inWidth);
  const [height, setHeight] = useState(inHeight);
  const [hatchAngle, setHatchAngle] = useState(inHatchAngle);
  const [strokeWidth, setStrokeWidth] = useState(inStrokeWidth);
  const [dJoint, setDJoint] = useState(inDJoint);
  const [hJointToBase, setHJointToBase] = useState(inHJointToBase);
  const [drawHatching, setDrawHatching] = useState(true);
  const [tFactor, setTFactor] = useState(inTFactor);
  const [strokeColor, setStrokeColor] = useState(inStrokeColor);
  const [jointFillColor, setJointFillColor] = useState(inJointFillColor);
  const [bodyColor, setBodyColor] = useState(inBodyColor);
  const [showOnlyJoint, setShowOnlyJoint] = useState(false);

  const [isInSliderView, setIsInSliderView] = useState(true);

  const handleStrokeChange = (value, event) => {
    const color = `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`;
    setStrokeColor(color);
  };
  const handleJointFillChange = (value, event) => {
    const color = `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`;
    setJointFillColor(color);
  };
  const handleBodyChange = (value, event) => {
    const color = `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`;
    setBodyColor(color);
  };

  const svg = useRef();
  const leftSide = useRef();
  const leftRect = useRect(leftSide);
  const lagerGroup = useRef();
  const lagerGroupBox = useBBox(lagerGroup);
  const zoomFactor = useZoom(0.2, 3);
  const sliderInputs = [
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
      name: "Diameter Joint",
      value: dJoint,
      min: 0,
      max: width / 3,
      updateFunc: setDJoint,
    },
    {
      name: "Height Center of Joint",
      value: hJointToBase,
      min: dJoint / 2,
      max: (width * 3) / 4,
      updateFunc: setHJointToBase,
    },

    {
      name: "Attachment Points on Joint",
      value: tFactor,
      min: 0,
      max: 100,
      updateFunc: setTFactor,
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
      name: "Show Hatching",
      value: drawHatching,
      updateFunc: setDrawHatching,
    },
    {
      name: "Show Only Joint",
      value: showOnlyJoint,
      updateFunc: setShowOnlyJoint,
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
      <ColorModal name="Joint Fill Color" color={jointFillColor} updateColor={handleJointFillChange} />
      <ColorModal name="Bearing Body Color" color={bodyColor} updateColor={handleBodyChange} />

      {checkInputsComps}
    </>
  );

  const pythiLength = Math.sqrt(
    lagerGroupBox.width * lagerGroupBox.width + lagerGroupBox.height * lagerGroupBox.height
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
              <FestLager
                groupRef={lagerGroup}
                x={(svgWidth - lagerGroupBox.width) / 2}
                y={(svgHeight - lagerGroupBox.height) / 2}
                strokeWidth={strokeWidth}
                hatchAngle={hatchAngle}
                xCenter={lagerGroupBox.width / 2}
                yCenter={lagerGroupBox.height / 2}
                width={width}
                angle={angle}
                height={height}
                dJoint={dJoint}
                hJointToBase={hJointToBase}
                drawHatching={drawHatching}
                tFactor={tFactor}
                strokeColor={strokeColor}
                jointFillColor={jointFillColor}
                bodyColor={bodyColor}
                showOnlyJoint={showOnlyJoint}
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

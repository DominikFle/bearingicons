import { Button, IconButton, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Einspannung } from "Bearings/Einspannung";
import { FestLager } from "Bearings/FestLager";
import { LosLager } from "Bearings/LosLager";
import { Schiebehuelse } from "Bearings/Schiebehuelse";
import React, { useEffect, useRef, useState } from "react";
import { saveSvg } from "util/saveSVG";
import { BearingSelectPaper } from "../BearingController/Util/BearingSelectPaper";
import { EinspannungsController } from "../BearingController/EinspannungsController";
import { FestLagerController } from "../BearingController/FestLagerController";
import { LosLagerController } from "../BearingController/LosLagerController";
import { SchiebehuelseController } from "../BearingController/SchiebehuelseController";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { CheckInput } from "BearingController/Util/CheckInput";
import { SliderInput } from "BearingController/Util/SliderInput";
import ColorModal from "BearingController/Util/ColorModal";
import { useBBox } from "Hooks/useBBox";
import { ControlTabs } from "BearingController/Util/ControlTabs";
import { useTheme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  wrapp: {
    height: "calc(100% - 35px)",

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

  image: {
    color: "red",
  },
  header: {
    color: "darkgrey",
    textAlign: "center",
  },
  paperWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  topLine: {
    // borderBottom: "1px solid black",
    fontWeight: "bold",
    width: "100%",
    height: "35px",
    display: "flex",
    justifyContent: "center",

    textTransform: "uppercase",
  },
  arrow: {
    display: "flex",
    justifyContent: "left",
    alignContent: "center",
    width: "70%",
    // background: theme.palette.secondary.light,
  },
  controllerName: {
    fontWeight: "bold",
    width: "30%",
    paddingLeft: "10px",
    borderLeft: "1px solid white",
    display: "flex",
    alignItems: "center",
    background: "white",
    color: theme.palette.primary.main,
  },
  overview: {
    fontWeight: "bold",
    width: "30%",
    paddingLeft: "10px",
    borderLeft: "1px solid white",
    display: "flex",
    alignItems: "center",
    color: theme.palette.secondary.main,
    background: "white",
  },
  heightNone: {
    width: "70%",
    height: "100%",
  },
  heightController: {
    width: "100%",
    height: "100%",
  },
  height90: {
    height: "90%",
  },
}));

export function Overview() {
  const classes = useStyles();
  const theme = useTheme();
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(20);
  const [hatchAngle, setHatchAngle] = useState(60);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [dJoint, setDJoint] = useState(30);
  const [hJointToBase, setHJointToBase] = useState(50);

  const [dBall, setDBall] = useState(15);
  const [drawBalls, setDrawBalls] = useState(true);

  const [tFactor, setTFactor] = useState(50);
  const [strokeColor, setStrokeColor] = useState("black");
  const [jointFillColor, setJointFillColor] = useState("white");
  const [bodyColor, setBodyColor] = useState("white");
  const [ballsColor, setBallsColor] = useState("white");

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
  const handleBallsChange = (value, event) => {
    const color = `rgba(${value.rgb.r},${value.rgb.g},${value.rgb.b},${value.rgb.a})`;
    setBallsColor(color);
  };
  const svg = useRef();
  const leftSide = useRef();

  const sliderInputs = [
    {
      name: "Height Hatching",
      value: height,
      min: 2,
      max: width,
      updateFunc: setHeight,
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
      name: "Diameter Balls",
      value: dBall,
      min: 2,
      max: width / 2.5,
      updateFunc: setDBall,
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
      name: "Show Balls",
      value: drawBalls,
      updateFunc: setDrawBalls,
    },
  ];
  const checkInputsComps = checkInputs.map((obj, index) => {
    return (
      <CheckInput color="secondary" key={obj.name} name={obj.name} value={obj.value} updateFunc={obj.updateFunc} />
    );
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
        color="secondary"
      />
    );
  });
  const colorView = (
    <>
      <ColorModal name="Stroke Color" color={strokeColor} updateColor={handleStrokeChange} />
      <ColorModal name="Joint Fill Color" color={jointFillColor} updateColor={handleJointFillChange} />
      <ColorModal name="Bearing Body Color" color={bodyColor} updateColor={handleBodyChange} />
      <ColorModal name="Bearing Balls Color" color={ballsColor} updateColor={handleBallsChange} />
      {checkInputsComps}
    </>
  );
  const loslagerRef = useRef();
  const festlagerRef = useRef();
  const einspannungRef = useRef();
  const schiebehuelseRef = useRef();

  const loslagerRefBox = useBBox(loslagerRef);
  const festlagerRefBox = useBBox(festlagerRef);
  const einspannungRefBox = useBBox(einspannungRef);
  const schiebehuelseRefBox = useBBox(schiebehuelseRef);
  const bearingsToEdit = [
    {
      name: "Feste Einspannung",
      box: einspannungRefBox,
      component: (
        <Einspannung
          groupRef={einspannungRef}
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          strokeWidth={strokeWidth}
          hatchAngle={hatchAngle}
          width={width}
          angle={0}
          height={height}
          strokeColor={strokeColor}
        />
      ),
    },
    {
      name: "Loslager",
      box: loslagerRefBox,
      component: (
        <LosLager
          groupRef={loslagerRef}
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          strokeWidth={strokeWidth}
          hatchAngle={hatchAngle}
          width={width}
          angle={0}
          height={height}
          dJoint={dJoint}
          hJointToBase={hJointToBase}
          dBall={dBall}
          drawBalls={drawBalls}
          tFactor={tFactor}
          strokeColor={strokeColor}
          jointFillColor={jointFillColor}
          bodyColor={bodyColor}
          ballsColor={ballsColor}
        />
      ),
    },
    {
      name: "Festlager",
      box: festlagerRefBox,
      component: (
        <FestLager
          groupRef={festlagerRef}
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          strokeWidth={strokeWidth}
          hatchAngle={hatchAngle}
          width={width}
          angle={0}
          height={height}
          dJoint={dJoint}
          hJointToBase={hJointToBase}
          tFactor={tFactor}
          strokeColor={strokeColor}
          jointFillColor={jointFillColor}
          bodyColor={bodyColor}
        />
      ),
    },
    {
      name: "Schiebehuelse",
      box: schiebehuelseRefBox,
      component: (
        <Schiebehuelse
          groupRef={schiebehuelseRef}
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          strokeWidth={strokeWidth}
          hatchAngle={hatchAngle}
          width={width}
          angle={0}
          height={height}
          dBall={dBall}
          drawBalls={drawBalls}
          strokeColor={strokeColor}
          ballsColor={ballsColor}
        />
      ),
    },
  ];

  const [bearingToEdit, setBearingToEdit] = useState("None");

  const buttons = bearingsToEdit.map((obj, index) => {
    return (
      <BearingSelectPaper
        funcOnClick={setBearingToEdit}
        box={obj.box}
        name={obj.name}
        key={obj.name}
        svgGroup={obj.component}
        strokeWidth={strokeWidth}
      />
    );
  });
  let body = <div></div>;
  if (bearingToEdit == "Feste Einspannung") {
    body = (
      <EinspannungsController
        inWidth={width}
        inHeight={height}
        inHatchAngle={hatchAngle}
        inStrokeWidth={strokeWidth}
        inStrokeColor={strokeColor}
      />
    );
  } else if (bearingToEdit == "Loslager") {
    body = (
      <LosLagerController
        inWidth={width}
        inHeight={height}
        inHatchAngle={hatchAngle}
        inStrokeWidth={strokeWidth}
        inDJoint={dJoint}
        inHJointToBase={hJointToBase}
        inTFactor={tFactor}
        inDBalls={dBall}
        inDrawBalls={drawBalls}
        inStrokeColor={strokeColor}
        inJointFillColor={jointFillColor}
        inBodyColor={bodyColor}
        inBallsColor={ballsColor}
      />
    );
  } else if (bearingToEdit == "Festlager") {
    body = (
      <FestLagerController
        inWidth={width}
        inHeight={height}
        inHatchAngle={hatchAngle}
        inStrokeWidth={strokeWidth}
        inDJoint={dJoint}
        inHJointToBase={hJointToBase}
        inTFactor={tFactor}
        inStrokeColor={strokeColor}
        inJointFillColor={jointFillColor}
        inBodyColor={bodyColor}
      />
    );
  } else if (bearingToEdit == "Schiebehuelse") {
    body = (
      <SchiebehuelseController
        inWidth={width}
        inHeight={height}
        inHatchAngle={hatchAngle}
        inStrokeWidth={strokeWidth}
        inBallsColor={ballsColor}
        inStrokeColor={strokeColor}
        inDBalls={dBall}
        inDrawBalls={drawBalls}
      />
    );
  } else {
    body = (
      <div>
        <div className={classes.paperWrapper}>{buttons}</div>
      </div>
    );
  }
  return (
    <>
      <Paper square elevation={2} className={classes.topLine}>
        <div className={classes.arrow}>
          {bearingToEdit == "None" ? (
            ""
          ) : (
            <IconButton size="small" onClick={() => setBearingToEdit("None")}>
              <ArrowBackIcon />
            </IconButton>
          )}
        </div>
        {bearingToEdit == "None" ? (
          <Typography className={classes.overview}>
            <div>Overview</div>
          </Typography>
        ) : (
          <Typography className={classes.controllerName}>
            <div>{bearingToEdit}</div>
          </Typography>
        )}
      </Paper>

      <div className={classes.wrapp}>
        <div className={bearingToEdit == "None" ? classes.heightNone : classes.heightController}>{body}</div>
        {bearingToEdit == "None" ? (
          <div className={classes.rightSide}>
            <ControlTabs
              isInSliderView={isInSliderView}
              setIsInSliderView={setIsInSliderView}
              color={theme.palette.secondary.main}
              name1={"Size"}
              name2={"Color"}
            />

            <div className={classes.panelBody}>{isInSliderView ? inputSliders : colorView}</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

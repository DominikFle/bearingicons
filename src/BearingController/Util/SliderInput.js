import { makeStyles, Paper, Typography, Slider } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  paper: {
    padding: "2px",
    borderBottom: "1px solid darkGrey",

    borderRadius: 0,
  },
  topRow: {
    display: "flex",
    marginBottom: "5px",
  },
  bottomRow: {
    display: "flex",
  },
  name: {
    // fontWeight: "bold",
    paddingLeft: "10%",
    width: "70%",
  },
  value: {
    width: "30%",
  },
  min: {
    textAlign: "right",
    width: "15%",
    color: "grey",
    fontSize: "10px",
  },
  slider: {
    width: "50%",
  },
  max: {
    textAlign: "left",
    width: "15%",
    color: "grey",
    fontSize: "10px",
  },
  range: {
    marginLeft: "10px",
    marginRight: "10px",
    width: "calc(100% - 20px)",
  },
  numberInput: {
    color: "black",
    fontWeight: "bold",
    width: "50px",
    border: "none",
    padding: "2px",
    borderBottom: "solid 1px black",
    background: "rgba(0,0,0,0.1)",
  },
});

export function SliderInput({ value, max, min, name, updateFunc, color = "primary" }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={0}>
      <div className={classes.topRow}>
        <Typography className={classes.name}>{name}</Typography>
        <div className={classes.value}>
          <input
            className={classes.numberInput}
            type="number"
            onChange={(e) => updateFunc(parseInt(e.target.value))}
            min={Math.floor(min)}
            max={Math.floor(max)}
            value={value}
          />
        </div>
      </div>
      <div className={classes.bottomRow}>
        <Typography className={classes.min}>{Math.floor(min)}</Typography>
        <div className={classes.slider}>
          <Slider
            className={classes.range}
            onChange={(e, newVal) => updateFunc(newVal)}
            min={min}
            max={max}
            value={value}
            color={color}
          />
        </div>
        <Typography className={classes.max}>{Math.floor(max)}</Typography>
      </div>
    </Paper>
  );
}

import { Button, makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = (props) =>
  makeStyles({
    bottomBorder: {
      borderBottom: "5px solid " + "black",
    },
    panelSelect: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      marginBottom: "10px",
      background: props.color,
    },
    tabButtons: {
      width: "50%",
      paddingTop: "13px",
      paddingBottom: "13px",
      margin: "0px",
      borderRadius: "0px",
    },
  });
export function ControlTabs({ isInSliderView, setIsInSliderView, name1, name2, color }) {
  const classes = useStyles({ color })();
  return (
    <Paper square elevation={3} className={classes.panelSelect}>
      <Button
        className={`${classes.tabButtons} ${isInSliderView ? classes.bottomBorder : ""}`}
        onClick={() => setIsInSliderView(true)}
      >
        {name1}
      </Button>
      <Button
        className={`${classes.tabButtons} ${isInSliderView ? "" : classes.bottomBorder}`}
        onClick={() => setIsInSliderView(false)}
      >
        {name2}
      </Button>
    </Paper>
  );
}

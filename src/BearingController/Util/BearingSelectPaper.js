import { Button, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React, { useEffect, useRef, useState } from "react";
import { saveSvg } from "util/saveSVG";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
    margin: "20px",
    width: "200px",
    height: "200px",
    "&:hover": {
      cursor: "pointer",
      background: "rgba(0,0,0,0.1)",
    },
  },
  typo: {
    fontSize: "1em",
    textAlign: "center",
    padding: "5px",
    color: theme.palette.grey[900],
  },
  wrapper: {
    marginTop: "5px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  downloadBtn: {
    marginLeft: "0px",
  },
  buttonCenter: {
    display: "flex",
    justifyContent: "center",
  },
  custom: {
    textAlign: "right",
    position: "absolute",
    right: "5px",
    bottom: "5px",
    color: "grey",
    fontSize: "13px",
  },
}));

export function BearingSelectPaper({ box, svgGroup, name, funcOnClick, strokeWidth }) {
  const classes = useStyles();
  const svg = useRef();
  return (
    <div>
      <Paper
        className={classes.paper}
        elevation={4}
        onClick={() => {
          funcOnClick(name);
        }}
      >
        <Typography className={classes.typo}>{name}</Typography>
        <div className={classes.wrapper}>
          <svg
            ref={svg}
            width="108"
            height="108"
            viewBox={`0 0 ${box?.width + strokeWidth} ${box?.height + strokeWidth}`}
          >
            {svgGroup}
          </svg>
        </div>
        <Typography className={classes.custom}>CUSTOMIZE BEARING</Typography>
      </Paper>
      <div className={classes.buttonCenter}>
        <Button
          className={classes.downloadBtn}
          size="small"
          variant="contained"
          onClick={() => {
            saveSvg(svg.current, name.split(" ").join("_") + ".svg");
          }}
        >
          Quick Download
        </Button>
      </div>
    </div>
  );
}

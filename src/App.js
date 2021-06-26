import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Einspannung } from "Bearings/Einspannung";
import { Overview } from "Overview/Overview";
import React, { useEffect, useRef, useState } from "react";
import { saveSvg } from "util/saveSVG";

const useStyles = makeStyles({
  image: {
    color: "red",
  },
});
function App() {
  const classes = useStyles();

  return <Overview />;
}

export default App;

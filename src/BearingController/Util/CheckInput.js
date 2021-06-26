import { makeStyles, Paper, Switch, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  paper: {
    display: "flex",
    padding: "2px",
    // borderBottom: "1px solid darkGrey",
    // borderTop: "1px solid darkGrey",
    borderRadius: 0,
    // marginRight: "0",
    // marginLeft: "0",
  },

  name: {
    paddingLeft: "10px",
    width: "70%",
  },
  switch: {
    color: "blue",
  },
});

export function CheckInput({ value, name, updateFunc, color }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={0}>
      <Switch
        className={classes.switch}
        size={"small"}
        checked={value}
        onChange={(e) => updateFunc((prev) => !prev)}
        name={name}
        color={color}
        // inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <Typography className={classes.name}>{name}</Typography>
    </Paper>
  );
}

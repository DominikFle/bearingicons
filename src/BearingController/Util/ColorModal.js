import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

import { SketchPicker } from "react-color";

const useStyles = (props) =>
  makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
    name: {
      margin: "8px",
    },
    colorBox: {
      marginLeft: "5%",
      cursor: "pointer",
      width: "1rem",
      height: "1rem",
      border: "1px solid grey",
      background: props.color,
    },
    anchorWrapper: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
    },
  }));

export default function ColorModal({ name, color, updateColor }) {
  const classes = useStyles({ color })();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div className={classes.anchorWrapper}>
        <div className={classes.colorBox} onClick={handleClick}></div>
        <Typography className={classes.name}>{name}</Typography>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <SketchPicker color={color} disableAlpha onChange={updateColor} />
      </Popover>
    </div>
  );
}

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    // marginBottom: "-4px",
    width: "100%",
    height: "200px",
    "max-height": "250px",
  },
});

function Banner({ props }) {
  console.log(props, "props banner");
  const classes = useStyles();
  return <img src={`${props.imgPath}`} className={classes.root} />;
}

export default Banner;

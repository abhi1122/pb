import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { CloudImage } from "../../components/CloudImage/CloudImage";

const useStyles = makeStyles({
  root: {
    // marginBottom: "-4px",
    width: "100%",
    height: "200px",
    "max-height": "250px",
    ["@media (min-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key

      height: "350px",
    },
  },
});

function Banner({ props }) {
  console.log(props, "props banner");
  const classes = useStyles();
  // return <img src={`${props.imgPath}`} className={classes.root} />;
  return <CloudImage publicId={props.imgPath} className={classes.root} />;
}

export default Banner;

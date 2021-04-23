import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "#5117c2",
  },
});

function ComponentWrapper(props) {
  const classes = useStyles();
  return <div className={classes.root}>{props.children}</div>;
}

export default ComponentWrapper;

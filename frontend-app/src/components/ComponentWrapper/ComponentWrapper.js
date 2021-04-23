import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import variables from "../../styles/globalStyles.module.scss";

const useStyles = makeStyles({
  root: {
    background: variables.backGroundColor,
  },
});

function ComponentWrapper(props) {
  const classes = useStyles();
  return <div className={classes.root}>{props.children}</div>;
}

export default ComponentWrapper;

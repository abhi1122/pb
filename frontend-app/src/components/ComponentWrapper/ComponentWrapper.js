import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    //  background: "#9017c2",
  },
});

function ComponentWrapper(props) {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <div className={classes.root}>{props.children}</div>
    </Container>
  );
}

export default ComponentWrapper;

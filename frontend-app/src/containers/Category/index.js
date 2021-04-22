import ComponentWrapper from "../../components/ComponentWrapper/ComponentWrapper";
import Header from "../../components/Header/Header";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "blue",
    // padding:10px
  },
  paper: {
    backgroundColor: "#9017c2",
    textTransform: "uppercase",
    textAlign: "center",
    color: "white",
  },
  business: {
    padding: "0px 5px 5px 5px",
    // padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: "#9017c2",
  },
  businessImg: {
    borderRadius: "5px",
    width: "100%",
    height: "250px",
    "max-height": "250px",
  },
  title: {
    padding: "4px 20px",
    border: "1px solid white",
  },
}));

function Category() {
  const classes = useStyles();

  return (
    <>
      <ComponentWrapper>
        <Header />
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.paper}>
            <h4>
              <span className={classes.title}>Select your business</span>
            </h4>
          </Grid>
          {[1, 2, 3, 4, 5].map((item) => (
            <Grid item xs={12} sm={6}>
              <div className={classes.business}>
                <img src="Capture.PNG" className={classes.businessImg} />
              </div>
            </Grid>
          ))}
        </Grid>
      </ComponentWrapper>
    </>
  );
}

export default Category;

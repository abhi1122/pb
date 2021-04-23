import ComponentWrapper from "../../components/ComponentWrapper/ComponentWrapper";
import Banner from "../../components/Banner/Banner";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import variables from "../../styles/globalStyles.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "blue",
    // padding:10px
  },
  paper: {
    backgroundColor: variables.backGroundColor,
    textTransform: "uppercase",
    textAlign: "center",
    color: variables.textPrimaryColor,
  },
  business: {
    padding: "0px 5px 5px 5px",
    // padding: theme.spacing(1),
    textAlign: "center",
    backgroundColor: variables.backGroundColor,
    ["@media (min-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      padding: "0px 10px 15px 10px",
    },
  },
  businessImg: {
    borderRadius: "5px",
    width: "100%",
    height: "130px",
    // "max-height": "130px",
    ["@media (min-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      height: "250px",
    },
    "&:hover": { transform: "scale3d(1, 1.05, 0.1)" },
  },
  title: {
    padding: "4px 20px",
    border: `1px solid ${variables.textPrimaryColor}`,
  },
}));

function Home() {
  const classes = useStyles();
  console.log(variables, "hreeeeeeee");
  return (
    <>
      <ComponentWrapper>
        <Banner />
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.paper}>
            <h4>
              <span className={classes.title}>Select your business</span>
            </h4>
          </Grid>
          {["Hotel.PNG", "HealthService.PNG", "YogaCapture.PNG"].map((img) => (
            <Grid item xs={12} sm={6}>
              <div className={classes.business}>
                <img src={img} className={classes.businessImg} />
              </div>
            </Grid>
          ))}
        </Grid>
      </ComponentWrapper>
    </>
  );
}

export default Home;

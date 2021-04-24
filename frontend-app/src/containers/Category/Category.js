import React, { useEffect } from 'react';
import { addCore } from '../../redux/actions/core';
import { connect } from 'react-redux';
import ComponentWrapper from '../../components/ComponentWrapper/ComponentWrapper';
import Banner from '../../components/Banner/Banner';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import variables from '../../styles/globalStyles.module.scss';
import { getCategoryList } from '../../redux/actions/category';
import { CloudImage } from '../../components/CloudImage/CloudImage';

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "blue",
    // padding:10px
  },
  paper: {
    backgroundColor: variables.backGroundColor,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: variables.textPrimaryColor,
    height: '40px',
    paddingTop: '5px',
  },
  business: {
    padding: '5px 5px',
    // padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: variables.backGroundColor,
    ['@media (min-width:780px)']: {
      // eslint-disable-line no-useless-computed-key
      padding: '0px 10px 15px 10px',
    },
  },
  title: {
    border: '1px solid #fff',
    padding: '3px 15px',
  },
  businessImg: {
    borderRadius: '5px',
    width: '100%',
    height: '150px',
    border: '1px solid #fff',
    // "max-height": "130px",
    ['@media (min-width:780px)']: {
      // eslint-disable-line no-useless-computed-key
      height: '250px',
    },
    '&:hover': { transform: 'scale3d(1, 1.05, 0.1)' },
  },
}));

function Category(props) {
  console.log(props.categoryList, '.......categoryList');

  useEffect(() => {
    console.log(props.match.params);
    if (props.match.params && props.match.params.id) {
      props.dispatch(
        getCategoryList({ searchQuery: { parentId: props.match.params.id } })
      );
    }
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
  }, []);

  const handleClick = (id) => {
    console.log('click hereeee');
    props.history.push(`/category/${id}`);
  };
  const classes = useStyles();
  console.log(variables, 'hreeeeeeee');
  return (
    <>
      <ComponentWrapper>
        <Banner props={{ imgPath: props.selectedCategory.url }} />
        {/* <CloudImage
          publicId={props.selectedCategory.url}
          height="150"
          width="150"
        /> */}

        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.paper}>
            <div>
              <span className={classes.title}>Choose Your Event </span>
            </div>
          </Grid>
          {props.categoryList.map((img) => (
            <Grid item xs={6} sm={3}>
              <div
                className={classes.business}
                onClick={() => handleClick(img._id)}
              >
                <CloudImage
                  publicId={img.file.public_id}
                  height='300'
                  width='300'
                  className={classes.businessImg}
                />
                {/* <img
                  src={`Main Categories/${img}`}
                  className={classes.businessImg}
                /> */}
              </div>
            </Grid>
          ))}
        </Grid>
      </ComponentWrapper>
    </>
  );
}
function mapStateToProps(state) {
  return {
    categoryList: state.category.list,
    selectedCategory: state.category.self,
  };
}

export default connect(mapStateToProps)(Category);

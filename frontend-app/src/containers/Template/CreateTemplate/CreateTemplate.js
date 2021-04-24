import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { getTemplate, createTemplate } from '../../../redux/actions/template';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

function CreateTemplate(props) {
  const classes = useStyles();

  const [formData, setState] = useState({});

  useEffect(() => {
    console.log(props.match.params);
    if (props.match.params && props.match.params.templateId) {
      props.dispatch(
        getTemplate({ searchQuery: { _id: props.match.params.templateId } })
      );
    }
    // Update the document title using the browser API
    //document.title = `You clicked ${count} times`;
  }, []);

  const changeInput = (event) => {
    //this.setState({ [event.target.name]: event.target.value });
    console.log(
      event.target.name,
      event.target.value,
      '..........event.target.value'
    );
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    // this.props.dispatch(
    //   formChange({ [event.target.name]: event.target.value })
    // );
  };

  const save = (e) => {
    e.preventDefault();
    console.log(formData, 'pppformData');
    const { templateId = null } = props.match.params;

    const templateForm = new FormData();
    templateForm.append('templateId', templateId);

    Object.keys(formData).forEach((key) => {
      console.log(key);
      templateForm.append(key, formData[key]);
    });

    props.dispatch(createTemplate(templateForm));

    console.log(JSON.stringify(templateForm), '.....formData');
  };

  const { texts = [] } = props.selectedTemplate;

  return (
    <div style={{ marginTop: '10px' }}>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={save}
        enctype='multipart/form-data'
      >
        {texts.map((val) => (
          <div>
            <TextField
              type='text'
              id='outlined-basic'
              label={`Enter your ${val.label}`}
              variant='outlined'
              style={{ width: '500px' }}
              name={val.label}
              onChange={changeInput}
            />
          </div>
        ))}
        <Button
          variant='contained'
          color='secondary'
          //className={classes.button}
          type='submit'
          startIcon={<DeleteIcon />}
        >
          Create Template
        </Button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    selectedTemplate: state.template.list,
  };
}

export default connect(mapStateToProps)(CreateTemplate);

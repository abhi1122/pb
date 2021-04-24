import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

export default function CreateTemplate() {
  const classes = useStyles();

  return (
    <div style={{ marginTop: '10px' }}>
      <form className={classes.root} noValidate autoComplete='off'>
        {[1, 2, 3].map((val) => (
          <div>
            <TextField
              id='outlined-basic'
              label='Enter your name'
              variant='outlined'
              style={{ width: '500px' }}
            />
          </div>
        ))}
      </form>
    </div>
  );
}

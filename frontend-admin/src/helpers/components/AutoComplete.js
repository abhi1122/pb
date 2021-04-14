/* eslint-disable no-use-before-define */
import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    display: 'block',
  },
  input: {
    width: '100%',
    height: 35,
    backgroundColor: '#12142B',
    opacity: 0.8,
    border: 'none',
    color: 'rgba(244, 244, 245, 0.9)',
  },
  listbox: {
    width: '100%',
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    backgroundColor: '#12142B',
    opacity: 0.8,
    border: 'none',
    color: 'rgba(244, 244, 245, 0.9)',
    '& li[data-focus="true"]': {
      backgroundColor: '#4a8df6',
      color: 'white',
      cursor: 'pointer',
    },
    '& li:active': {
      backgroundColor: '#2977f5',
      color: 'white',
    },
  },
}));

export default function UseAutocomplete({
  label,
  data,
  labelKey,
  callBack,
  selected,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(selected);
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: data,
    value,
    getOptionLabel: (option) => option[labelKey],
    onChange: (event, newValue) => {
      console.log(newValue, '.......newValue');
      setValue(newValue);
      callBack(newValue);
    },
  });

  return (
    <div>
      <div {...getRootProps()}>
        <label className={classes.label} {...getInputLabelProps()}>
          {label}
        </label>
        <input className={classes.input} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option[labelKey]}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export const InputValidationError = ({ error }) => {
  return <span style={{ color: '#db2a34', fontWeight: 600 }}>{error}</span>;
};

export const SectionHeader = ({
  headName,
  headButtonName,
  headButtonUrl,
  props,
  buttonState = {},
}) => {
  return (
    <div>
      <h5 style={{ float: 'left', paddingTop: '10px' }}>
        <span className='fw-semi-bold'>{headName}</span>
      </h5>
      <Button
        outline
        color='success'
        onClick={() =>
          props.history.push({ pathname: headButtonUrl, state: buttonState })
        }
        style={{ float: 'right' }}
      >
        {headButtonName}
      </Button>
      <div style={{ clear: 'both', marginBottom: '20px' }}></div>
    </div>
  );
};

import React from 'react';
import { Button, Badge } from 'reactstrap';
import Moment from 'react-moment';

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

export const StatusBadge = ({ status }) => {
  return (
    <>
      {status ? (
        <Badge color='success'>Active</Badge>
      ) : (
        <Badge color='danger'>Inactive</Badge>
      )}
    </>
  );
};

export const FormatDate = ({ date }) => {
  return <Moment format='DD-MM-YYYY hh:mm:ss'>{date}</Moment>;
};

export const ShowDates = ({ createdAt, updatedAt }) => {
  return (
    <span>
      <Badge color='dark'>
        <FormatDate date={createdAt} />
      </Badge>
      <br />
      <br />
      <Badge color='light'>
        <FormatDate date={updatedAt} />
      </Badge>
    </span>
  );
};

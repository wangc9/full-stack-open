import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          id="show-button"
          onClick={toggleVisibility}
          variant="contained"
          color="primary"
        >
          <b>{props.buttonLabel}</b>
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          id="cancel-button"
          onClick={toggleVisibility}
          variant="contained"
          color="secondary"
        >
          <b>cancel</b>
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;

import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SimpleSnackbar = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  // Expose a method to open the snackbar
  const openSnackbar = (displayMessage) => {
    setOpen(true);
    setMessage(displayMessage);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // Expose the openSnackbar method through the ref
  React.useImperativeHandle(ref, () => ({
    openSnackbar,
  }));

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message= {message}
        action={action}
      />
    </div>
  );
});

export default SimpleSnackbar;

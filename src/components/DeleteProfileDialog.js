import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function DeleteProfileDialog({ open, setOpen, handleDelete }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Delete Profile?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this profile?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus color='warning' size='small' onClick={handleDelete}>
          Yes, Delete
        </Button>
        <Button size='small' onClick={handleClose}>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteProfileDialog;
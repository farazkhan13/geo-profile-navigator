import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

function EditProfileDialog({ profile, open, setOpen, handleEditSubmit }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { reset, register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    if (open) {
      reset(profile);
    }
  }, [profile, open, reset]);

  const fieldProps = (fieldName, label, pattern, message) => ({
    id: `outlined-${fieldName}`,
    label,
    variant: "outlined",
    error: !!errors[fieldName],
    helperText: errors[fieldName]?.message,
    ...register(fieldName, {
      required: "This field is required",
      pattern: {
        value: pattern,
        message
      }
    })
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Edit Profile"}
      </DialogTitle>

      <DialogContent>
        <div className='edit-dialog-content'>
          <form onSubmit={handleSubmit(handleEditSubmit)}>
            <TextField {...fieldProps("firstName", "First Name", /^[A-Za-z\s]+$/, "Only alphabetic characters and spaces are allowed")} />
            <TextField {...fieldProps("lastName", "Last Name", /^[A-Za-z\s]+$/, "Only alphabetic characters and spaces are allowed")} />
            <TextField {...fieldProps("age", "Age", /^\d+$/, "Age must be a number")} />
            <TextField {...fieldProps("height", "Height", /^\d+(\.\d+)?$/, "Height must be a number (decimal allowed)")} />
            <TextField {...fieldProps("weight", "Weight", /^\d+(\.\d+)?$/, "Weight must be a number (decimal allowed)")} />
            <TextField {...fieldProps("university", "University", /^[A-Za-z\s.,'-]+$/, "Only alphabetic characters and spaces are allowed")} />
            <Button variant="contained" type='submit'>Submit</Button>
          </form>
        </div>
      </DialogContent>

    </Dialog>
  );
}

export default EditProfileDialog;
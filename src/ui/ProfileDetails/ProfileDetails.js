import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProfiles from '../../hooks/useProfiles';
import Grid from '@mui/material/Grid2';
import { IconButton, Paper, TextField, Typography } from '@mui/material';
import ProfileMap from '../../components/ProfileMap';
import { ArrowBack } from '@mui/icons-material';

function ProfileDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { profiles, loading } = useProfiles();
  const profile = profiles.find(p => p.id.toString() === id);

  const goBack = () => {
    navigate('/dashboard')
  }
  const shapeAddress = () => {
    return `${profile.address.address} ${profile.address.city} - ${profile.address.postalCode}, ${profile.address.state}, ${profile.address.country}`
  }

  if (!profiles?.length || loading) return 'Loading...'

  return (
    <Grid container rowSpacing={3} sx={{ mt: 5 }} className="justify-content-left profile-grid">
      <IconButton color='primary' size='small' onClick={goBack} sx={{ mt: 3 }}>
        <ArrowBack color='info' className='pointer-cursor' fontSize='small' /> &nbsp;Back
      </IconButton>
      <Paper elevation={2} sx={{ padding: 2, width: '100%' }}>
        <Typography gutterBottom variant="h6" component="div">
          Personal Details
        </Typography>
        <Grid container columnSpacing={3} rowSpacing={3} sx={{ mt: 3 }}>
          <TextField label='Name' disabled defaultValue={`${profile.firstName} ${profile.lastName}`} />
          <TextField label='Age' disabled defaultValue={profile.age} />
          <TextField label='Height' disabled defaultValue={profile.height} />
          <TextField label='Weight' disabled defaultValue={profile.weight} />
          <TextField label='Birth Date' disabled defaultValue={profile.birthDate} />
          <TextField label='Gender' disabled defaultValue={profile.gender} />
          <TextField label='Eye Color' disabled defaultValue={profile.eyeColor} />
          <TextField label='Phone' disabled defaultValue={profile.phone} sx={{ width: '-webkit-fill-available' }} />
          <TextField label='Email' disabled defaultValue={profile.email} sx={{ width: '-webkit-fill-available' }} />
          <TextField label='University' disabled defaultValue={profile.university} sx={{ width: '-webkit-fill-available' }} />
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ padding: 2, width: '100%' }}>
        <Typography gutterBottom variant="h6" component="div">
          Company
        </Typography>
        <Grid container columnSpacing={3} rowSpacing={3} sx={{ mt: 3 }}>
          <TextField label='Name' disabled defaultValue={profile.company.name} />
          <TextField label='Designation' disabled defaultValue={profile.company.title} />
          <TextField label='Department' disabled defaultValue={profile.company.department} />
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ padding: 2, mb: 3, width: '100%' }}>
        <Typography gutterBottom variant="h6" component="div">
          Location
        </Typography>
        <Grid container columnSpacing={3} rowSpacing={3} sx={{ mt: 3 }}>
          <TextField label='Address' disabled defaultValue={shapeAddress()} sx={{ width: '-webkit-fill-available' }} />
          <ProfileMap address={profile.address} />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ProfileDetails;